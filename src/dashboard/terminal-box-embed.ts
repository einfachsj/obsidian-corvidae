import type CorvidaePlugin from "../main";
import { t } from "../i18n";
import type { DashboardBox } from "./box-types";
import {
	createEmbeddedLeaf,
	destroyEmbeddedLeaf,
	type EmbeddedLeafMount,
	reattachEmbeddedLeaf,
} from "./embed-workspace";
import {
	buildTerminalViewState,
	resolveDefaultTerminalProfile,
	TERMINAL_BOX_WORKSPACE_CLASS,
} from "./terminal-integration";

export class DashboardTerminalBoxEmbed {
	private mounts = new Map<string, EmbeddedLeafMount>();
	private syncTimer: number | null = null;

	constructor(private plugin: CorvidaePlugin) {}

	scheduleSync(
		terminalBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.sync(terminalBoxes, resolveHost);
		}, 0);
	}

	async sync(
		terminalBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const activeIds = new Set(terminalBoxes.map((box) => box.id));

		for (const [boxId, mount] of this.mounts.entries()) {
			if (!activeIds.has(boxId)) {
				destroyEmbeddedLeaf(mount);
				this.mounts.delete(boxId);
			}
		}

		for (const box of terminalBoxes) {
			const host = resolveHost(box.id);
			if (!host) continue;
			await this.mount(box, host);
		}
	}

	detachAll(): void {
		for (const mount of this.mounts.values()) {
			destroyEmbeddedLeaf(mount);
		}
		this.mounts.clear();
	}

	private async mount(box: DashboardBox, host: HTMLElement): Promise<void> {
		const resolved = resolveDefaultTerminalProfile(this.plugin.app);
		if (!resolved) {
			this.showUnavailable(host);
			const existing = this.mounts.get(box.id);
			if (existing) {
				destroyEmbeddedLeaf(existing);
				this.mounts.delete(box.id);
			}
			return;
		}

		host.empty();
		host.removeClass("corvidae-terminal-unavailable");

		let mount = this.mounts.get(box.id);

		if (!mount) {
			mount = createEmbeddedLeaf(
				this.plugin.app.workspace,
				host,
				"vertical",
				TERMINAL_BOX_WORKSPACE_CLASS
			);
			this.mounts.set(box.id, mount);

			await mount.leaf.setViewState(
				buildTerminalViewState(
					resolved.profileSourceId,
					resolved.profile,
					box.title
				),
				{ focus: false }
			);
		} else {
			reattachEmbeddedLeaf(mount, host);
		}

		await mount.leaf.loadIfDeferred();
		mount.leaf.onResize();
	}

	private showUnavailable(host: HTMLElement): void {
		host.empty();
		host.addClass("corvidae-terminal-unavailable");
		host.createDiv({
			cls: "corvidae-terminal-unavailable-text",
			text: t("dashboard.box.terminalUnavailable"),
		});
	}
}
