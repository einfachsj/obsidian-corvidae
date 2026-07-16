import type CorvidaePlugin from "../main";
import { t } from "../i18n";
import type { DashboardBox } from "./box-types";
import {
	BROWSER_BOX_WORKSPACE_CLASS,
	buildWebViewerViewState,
	isWebViewerEnabled,
	normalizeBrowserUrl,
} from "./browser-integration";
import {
	createEmbeddedLeaf,
	destroyEmbeddedLeaf,
	type EmbeddedLeafMount,
	reattachEmbeddedLeaf,
} from "./embed-workspace";
import { applyBrowserScrollbarHiding } from "./browser-scroll";

interface BrowserBoxMount {
	mount: EmbeddedLeafMount;
	url: string;
}

export class DashboardBrowserBoxEmbed {
	private mounts = new Map<string, BrowserBoxMount>();
	private syncTimer: number | null = null;

	constructor(private plugin: CorvidaePlugin) {}

	async navigateLink(
		boxId: string,
		link: string,
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const url = normalizeBrowserUrl(link);
		if (!url) return;

		const host = resolveHost(boxId);
		if (!host) return;

		await this.mount({ id: boxId, type: "browser", link: url } as DashboardBox, host);
	}

	scheduleSync(
		browserBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.sync(browserBoxes, resolveHost);
		}, 0);
	}

	async sync(
		browserBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const activeIds = new Set(
			browserBoxes
				.filter((box) => normalizeBrowserUrl(box.link ?? ""))
				.map((box) => box.id)
		);

		for (const [boxId, entry] of this.mounts.entries()) {
			if (!activeIds.has(boxId)) {
				destroyEmbeddedLeaf(entry.mount);
				this.mounts.delete(boxId);
			}
		}

		for (const box of browserBoxes) {
			const host = resolveHost(box.id);
			if (!host) continue;
			await this.mount(box, host);
		}
	}

	detachAll(): void {
		for (const entry of this.mounts.values()) {
			destroyEmbeddedLeaf(entry.mount);
		}
		this.mounts.clear();
	}

	private async mount(box: DashboardBox, host: HTMLElement): Promise<void> {
		const url = normalizeBrowserUrl(box.link ?? "");
		if (!url) return;

		if (!isWebViewerEnabled(this.plugin.app)) {
			this.showUnavailable(host);
			const existing = this.mounts.get(box.id);
			if (existing) {
				destroyEmbeddedLeaf(existing.mount);
				this.mounts.delete(box.id);
			}
			return;
		}

		host.empty();
		host.removeClass("corvidae-browser-unavailable");

		let entry = this.mounts.get(box.id);

		if (entry && entry.url !== url) {
			destroyEmbeddedLeaf(entry.mount);
			this.mounts.delete(box.id);
			entry = undefined;
		}

		if (!entry) {
			const mount = createEmbeddedLeaf(
				this.plugin.app.workspace,
				host,
				"vertical",
				BROWSER_BOX_WORKSPACE_CLASS
			);
			entry = { mount, url };
			this.mounts.set(box.id, entry);
			await mount.leaf.setViewState(buildWebViewerViewState(url), {
				focus: false,
			});
		} else {
			reattachEmbeddedLeaf(entry.mount, host);
		}

		await entry.mount.leaf.loadIfDeferred();
		entry.mount.leaf.onResize();
		applyBrowserScrollbarHiding(entry.mount);
		window.requestAnimationFrame(() => {
			applyBrowserScrollbarHiding(entry.mount);
		});
	}

	private showUnavailable(host: HTMLElement): void {
		host.empty();
		host.addClass("corvidae-browser-unavailable");
		host.createDiv({
			cls: "corvidae-browser-unavailable-text",
			text: t("dashboard.box.webviewerUnavailable"),
		});
	}
}
