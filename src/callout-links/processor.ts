import type { MarkdownPostProcessorContext, Plugin } from "obsidian";

const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";
const FAVICON_CLASS = "corvidae-callout-favicon";
const HEADING_OPEN_CLASS = "corvidae-heading-open-links";
const OPEN_STAGGER_MS = 120;

function headingLevel(el: HTMLElement): number {
	const match = /^H([1-6])$/i.exec(el.tagName);
	return match ? Number(match[1]) : 6;
}

function isExternalHref(href: string | null): href is string {
	return !!href && /^https?:\/\//i.test(href);
}

function firstCalloutExternalUrl(callout: HTMLElement): string | null {
	const title =
		callout.querySelector(".callout-title") ??
		callout.querySelector(".callout-title-inner");
	const scope = title ?? callout;
	const anchors = scope.querySelectorAll("a.external-link, a[href]");
	for (let i = 0; i < anchors.length; i++) {
		const a = anchors.item(i);
		if (!(a instanceof HTMLAnchorElement)) continue;
		if (isExternalHref(a.href)) return a.href;
	}
	return null;
}

function faviconUrlForPage(pageUrl: string): string | null {
	try {
		const host = new URL(pageUrl).hostname;
		if (!host) return null;
		return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=32`;
	} catch {
		return null;
	}
}

function enhanceCalloutFavicons(root: HTMLElement): void {
	const callouts = root.querySelectorAll(".callout");
	for (let i = 0; i < callouts.length; i++) {
		const callout = callouts.item(i);
		if (!(callout instanceof HTMLElement)) continue;

		const pageUrl = firstCalloutExternalUrl(callout);
		if (!pageUrl) continue;

		const icon = callout.querySelector(".callout-icon");
		if (!(icon instanceof HTMLElement)) continue;
		if (icon.querySelector(`.${FAVICON_CLASS}`)) continue;

		const src = faviconUrlForPage(pageUrl);
		if (!src) continue;

		const previousHtml = icon.innerHTML;
		icon.empty();
		const img = icon.createEl("img", {
			cls: FAVICON_CLASS,
			attr: { src, alt: "", decoding: "async" },
		});
		img.addEventListener("error", () => {
			icon.empty();
			icon.innerHTML = previousHtml;
		});
	}
}

function collectSectionCalloutUrls(heading: HTMLElement): string[] {
	const level = headingLevel(heading);
	const urls: string[] = [];
	const seen = new Set<string>();

	let sibling = heading.nextElementSibling;
	while (sibling) {
		if (!(sibling instanceof HTMLElement)) {
			sibling = sibling.nextElementSibling;
			continue;
		}

		if (/^H[1-6]$/i.test(sibling.tagName) && headingLevel(sibling) <= level) {
			break;
		}

		const callouts =
			sibling.classList.contains("callout")
				? [sibling]
				: Array.from(sibling.querySelectorAll(".callout"));

		for (const callout of callouts) {
			if (!(callout instanceof HTMLElement)) continue;
			const anchors = callout.querySelectorAll("a.external-link, a[href]");
			for (let i = 0; i < anchors.length; i++) {
				const a = anchors.item(i);
				if (!(a instanceof HTMLAnchorElement)) continue;
				if (!isExternalHref(a.href) || seen.has(a.href)) continue;
				seen.add(a.href);
				urls.push(a.href);
			}
		}

		sibling = sibling.nextElementSibling;
	}

	return urls;
}

function openUrlsStaggered(urls: string[]): void {
	urls.forEach((url, index) => {
		window.setTimeout(() => {
			window.open(url, "_blank", "noopener,noreferrer");
		}, index * OPEN_STAGGER_MS);
	});
}

function enhanceHeadingOpenLinks(root: HTMLElement): void {
	const headings = root.querySelectorAll(HEADING_SELECTOR);
	for (let i = 0; i < headings.length; i++) {
		const heading = headings.item(i);
		if (!(heading instanceof HTMLElement)) continue;
		if (heading.dataset.corvidaeHeadingLinks === "1") continue;

		const urls = collectSectionCalloutUrls(heading);
		if (urls.length === 0) continue;

		heading.dataset.corvidaeHeadingLinks = "1";
		heading.addClass(HEADING_OPEN_CLASS);
		heading.addEventListener("click", (evt) => {
			const target = evt.target;
			if (target instanceof Element && target.closest("a")) return;
			evt.preventDefault();
			openUrlsStaggered(urls);
		});
	}
}

export function registerCalloutLinkEnhancer(plugin: Plugin): void {
	plugin.registerMarkdownPostProcessor(
		(el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
			enhanceCalloutFavicons(el);
			enhanceHeadingOpenLinks(el);
		}
	);
}
