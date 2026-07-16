import type { EmbeddedLeafMount } from "./embed-workspace";
import { getEmbeddedRootSplit } from "./embed-workspace";

const WEBVIEW_HIDE_SCROLLBAR_CSS = `
html, body {
	scrollbar-width: none !important;
	-ms-overflow-style: none !important;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none !important;
	width: 0 !important;
	height: 0 !important;
}
`;

type ElectronWebview = HTMLElement & {
	insertCSS?(css: string): void;
	executeJavaScript?(code: string): Promise<unknown>;
};

const WRAPPER_SELECTOR =
	".view-content, .webviewer-content, .workspace-leaf-content, .workspace-tabs, .workspace-tab-container, .workspace-split";

export function applyBrowserScrollbarHiding(mount: EmbeddedLeafMount): void {
	const root = getEmbeddedRootSplit(mount);

	root.querySelectorAll<HTMLElement>(WRAPPER_SELECTOR).forEach((el) => {
		el.addClass("corvidae-hide-native-scrollbar");
	});

	root.querySelectorAll<ElectronWebview>("webview").forEach((webview) => {
		const inject = (): void => {
			try {
				webview.insertCSS?.(WEBVIEW_HIDE_SCROLLBAR_CSS);
				void webview.executeJavaScript?.(`
					(function() {
						if (document.getElementById("corvidae-hide-scrollbars")) return;
						const el = document.createElement("style");
						el.id = "corvidae-hide-scrollbars";
						el.textContent = ${JSON.stringify(WEBVIEW_HIDE_SCROLLBAR_CSS)};
						document.documentElement.appendChild(el);
					})();
				`);
			} catch {
				// Webview may not be ready yet.
			}
		};

		if (webview.dataset.corvidaeScrollHidden !== "true") {
			webview.dataset.corvidaeScrollHidden = "true";
			webview.addEventListener("dom-ready", inject);
		}

		inject();
	});
}
