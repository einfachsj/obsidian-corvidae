import { MarkdownRenderChild } from "obsidian";

const SANDBOX = "allow-scripts allow-popups allow-forms";
const HEIGHT_MSG_TYPE = "corvidae-html-height";
const SCROLL_MSG_TYPE = "corvidae-html-scroll";
const HEIGHT_EPSILON_PX = 2;
const DEBOUNCE_MS = 50;
const SCROLL_TOP_PADDING = 12;

/** Forces measurable document flow inside the sandboxed iframe. */
const EMBED_CSS = `<style data-corvidae-html-embed>
html, body {
	height: auto !important;
	min-height: 0 !important;
	overflow: visible !important;
	margin: 0;
}
</style>`;

/**
 * Injected into the blob document — height reports + in-page hash nav.
 * Hash clicks postMessage to the parent so Obsidian's note scroller moves
 * (the iframe itself has scrolling=no and full content height).
 *
 * No window.resize listener: parent height changes would re-trigger vh loops.
 */
const EMBED_BRIDGE = `<script data-corvidae-html-bridge>
(function () {
	var HEIGHT_TYPE = ${JSON.stringify(HEIGHT_MSG_TYPE)};
	var SCROLL_TYPE = ${JSON.stringify(SCROLL_MSG_TYPE)};
	var timer = null;
	var lastSent = -1;

	function contentBottom() {
		var body = document.body;
		if (!body) return 0;
		var max = 0;
		var nodes = body.children;
		for (var i = 0; i < nodes.length; i++) {
			var el = nodes[i];
			if (!(el instanceof Element)) continue;
			var rect = el.getBoundingClientRect();
			var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
			max = Math.max(max, top + rect.height);
		}
		return max;
	}

	function measure() {
		var doc = document.documentElement;
		var body = document.body;
		var h = Math.max(
			doc ? doc.scrollHeight : 0,
			body ? body.scrollHeight : 0,
			contentBottom()
		);
		h = Math.ceil(h);
		if (h < 0 || !isFinite(h)) return;
		if (lastSent >= 0 && Math.abs(h - lastSent) < ${HEIGHT_EPSILON_PX}) return;
		lastSent = h;
		parent.postMessage({ type: HEIGHT_TYPE, height: h }, "*");
	}

	function schedule() {
		if (timer !== null) clearTimeout(timer);
		timer = setTimeout(function () {
			timer = null;
			requestAnimationFrame(function () {
				requestAnimationFrame(measure);
			});
		}, ${DEBOUNCE_MS});
	}

	function offsetTopInDocument(el) {
		var rect = el.getBoundingClientRect();
		return rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
	}

	function onHashClick(event) {
		var node = event.target;
		while (node && node !== document && !(node instanceof HTMLAnchorElement)) {
			node = node.parentElement;
		}
		if (!(node instanceof HTMLAnchorElement)) return;
		var href = node.getAttribute("href");
		if (!href || href.charAt(0) !== "#") return;
		var id = href.slice(1);
		if (!id) return;
		var target = document.getElementById(id);
		if (!target) return;
		event.preventDefault();
		parent.postMessage(
			{ type: SCROLL_TYPE, top: Math.max(0, offsetTopInDocument(target)) },
			"*"
		);
	}

	function startObservers() {
		document.addEventListener("click", onHashClick, true);
		if (typeof ResizeObserver !== "undefined" && document.body) {
			new ResizeObserver(schedule).observe(document.body);
		}
		if (typeof MutationObserver !== "undefined" && document.documentElement) {
			new MutationObserver(schedule).observe(document.documentElement, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			});
		}
		schedule();
	}

	if (document.readyState === "complete") {
		startObservers();
	} else {
		window.addEventListener("load", startObservers);
	}
})();
</script>`;

function injectEmbedAssets(html: string): string {
	let out = html;
	if (/<\/head>/i.test(out)) {
		out = out.replace(/<\/head>/i, `${EMBED_CSS}</head>`);
	} else if (/<body\b/i.test(out)) {
		out = out.replace(/<body\b[^>]*>/i, (open) => `${EMBED_CSS}${open}`);
	} else {
		out = EMBED_CSS + out;
	}

	if (/<\/body>/i.test(out)) {
		return out.replace(/<\/body>/i, `${EMBED_BRIDGE}</body>`);
	}
	return out + EMBED_BRIDGE;
}

function findScrollParent(el: HTMLElement): HTMLElement {
	let node: HTMLElement | null = el.parentElement;
	while (node) {
		const style = getComputedStyle(node);
		const overflowY = style.overflowY;
		if (
			(overflowY === "auto" ||
				overflowY === "scroll" ||
				overflowY === "overlay") &&
			node.scrollHeight > node.clientHeight + 1
		) {
			return node;
		}
		node = node.parentElement;
	}
	return (el.ownerDocument.scrollingElement as HTMLElement) ?? el.ownerDocument.documentElement;
}

export class CorvidaeHtmlRenderChild extends MarkdownRenderChild {
	private blobUrl: string | null = null;
	private iframe: HTMLIFrameElement | null = null;
	private lastAppliedHeight = -1;

	constructor(
		containerEl: HTMLElement,
		private readonly source: string
	) {
		super(containerEl);
	}

	onload(): void {
		this.containerEl.empty();
		this.containerEl.addClass("corvidae-html-embed");

		const html = injectEmbedAssets(this.source);
		const blob = new Blob([html], { type: "text/html" });
		this.blobUrl = URL.createObjectURL(blob);

		// Build detached: set sandbox before src before append — avoids
		// Chromium leaking parent origin into the initial about:blank doc.
		const iframe = this.containerEl.ownerDocument.createElement("iframe");
		iframe.className = "corvidae-html-iframe";
		iframe.setAttribute("sandbox", SANDBOX);
		iframe.setAttribute("title", "CORVIDAE HTML");
		iframe.setAttribute("scrolling", "no");
		iframe.src = this.blobUrl;
		this.iframe = iframe;
		this.containerEl.appendChild(iframe);

		window.addEventListener("message", this.onMessage);
	}

	onunload(): void {
		window.removeEventListener("message", this.onMessage);
		this.iframe = null;
		this.lastAppliedHeight = -1;
		if (this.blobUrl) {
			URL.revokeObjectURL(this.blobUrl);
			this.blobUrl = null;
		}
		this.containerEl.empty();
		this.containerEl.removeClass("corvidae-html-embed");
	}

	private onMessage = (event: MessageEvent): void => {
		if (!this.iframe || event.source !== this.iframe.contentWindow) return;
		const data = event.data;
		if (!data || typeof data !== "object") return;

		const type = (data as { type?: unknown }).type;
		if (type === HEIGHT_MSG_TYPE) {
			this.applyHeight((data as { height?: unknown }).height);
			return;
		}
		if (type === SCROLL_MSG_TYPE) {
			this.scrollNoteToOffset((data as { top?: unknown }).top);
		}
	};

	private applyHeight(height: unknown): void {
		if (!this.iframe) return;
		if (typeof height !== "number" || !Number.isFinite(height) || height < 0) {
			return;
		}
		const next = Math.ceil(height);
		if (
			this.lastAppliedHeight >= 0 &&
			Math.abs(next - this.lastAppliedHeight) < HEIGHT_EPSILON_PX
		) {
			return;
		}
		this.lastAppliedHeight = next;
		this.iframe.style.height = `${next}px`;
	}

	private scrollNoteToOffset(top: unknown): void {
		if (!this.iframe) return;
		if (typeof top !== "number" || !Number.isFinite(top) || top < 0) return;

		const scrollParent = findScrollParent(this.iframe);
		const iframeRect = this.iframe.getBoundingClientRect();
		const parentRect = scrollParent.getBoundingClientRect();
		const next =
			scrollParent.scrollTop +
			(iframeRect.top - parentRect.top) +
			top -
			SCROLL_TOP_PADDING;

		scrollParent.scrollTo({
			top: Math.max(0, next),
			behavior: "smooth",
		});
	}
}
