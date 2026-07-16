import { Component, MarkdownRenderer, TFile } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import type { DashboardBox } from "./box-types";
import { resolveTicketLogMarkdown } from "./ticket-callouts";

interface TicketBoxMount {
	host: HTMLElement;
	contentEl: HTMLElement;
	projectId: string;
	displayMode: "last" | "all";
	sourcePath: string;
	renderComponent: Component | null;
}

export class DashboardTicketBoxEmbed {
	private mounts = new Map<string, TicketBoxMount>();
	private syncTimer: number | null = null;
	private vaultListenerRegistered = false;

	constructor(private plugin: CorvidaePlugin) {}

	onload(): void {
		if (this.vaultListenerRegistered) return;
		this.vaultListenerRegistered = true;
		this.plugin.registerEvent(
			this.plugin.app.vault.on("modify", (file) => {
				if (!(file instanceof TFile) || file.extension !== "md") return;
				const affected = [...this.mounts.values()].some(
					(mount) => mount.sourcePath === file.path
				);
				if (affected) {
					void this.syncAllMounted();
				}
			})
		);
	}

	scheduleSync(
		ticketBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			window.requestAnimationFrame(() => {
				void this.sync(ticketBoxes, resolveHost);
			});
		}, 0);
	}

	async sync(
		ticketBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const activeIds = new Set(ticketBoxes.map((box) => box.id));

		for (const [boxId, mount] of this.mounts.entries()) {
			if (!activeIds.has(boxId)) {
				this.disposeMount(mount);
				this.mounts.delete(boxId);
			}
		}

		for (const box of ticketBoxes) {
			const host = resolveHost(box.id);
			if (!host) continue;
			await this.mount(box, host);
		}
	}

	detachAll(): void {
		for (const mount of this.mounts.values()) {
			this.disposeMount(mount);
		}
		this.mounts.clear();
	}

	private disposeMount(mount: TicketBoxMount): void {
		mount.renderComponent?.unload();
		mount.renderComponent = null;
	}

	private async syncAllMounted(): Promise<void> {
		for (const [boxId, mount] of this.mounts.entries()) {
			const box = this.plugin.dashboardBoxStore.getBoxById(boxId);
			if (!box || box.type !== "ticket") continue;
			await this.renderMount(box, mount);
		}
	}

	private async mount(box: DashboardBox, host: HTMLElement): Promise<void> {
		const projectId = box.ticketProjectId ?? "";
		const displayMode = box.ticketDisplayMode ?? "last";
		const sourcePath = this.resolveDevelopmentLogPath(projectId) ?? "";

		const existing = this.mounts.get(box.id);
		const hostChanged =
			!existing ||
			existing.host !== host ||
			!existing.contentEl.isConnected;

		const entry: TicketBoxMount = hostChanged
			? (() => {
					if (existing) this.disposeMount(existing);
					host.empty();
					const next: TicketBoxMount = {
						host,
						contentEl: host.createDiv({ cls: "corvidae-box-ticket-content" }),
						projectId,
						displayMode,
						sourcePath,
						renderComponent: null,
					};
					this.mounts.set(box.id, next);
					return next;
				})()
			: (() => {
					existing.projectId = projectId;
					existing.displayMode = displayMode;
					existing.sourcePath = sourcePath;
					return existing;
				})();

		await this.renderMount(box, entry);
	}

	private async renderMount(
		box: DashboardBox,
		mount: TicketBoxMount
	): Promise<void> {
		mount.renderComponent?.unload();
		mount.renderComponent = null;
		mount.contentEl.empty();

		if (!mount.projectId) {
			mount.contentEl.createDiv({
				cls: "corvidae-box-ticket-empty",
				text: t("dashboard.box.ticketNoProject"),
			});
			return;
		}

		if (!mount.sourcePath) {
			mount.contentEl.createDiv({
				cls: "corvidae-box-ticket-empty",
				text: t("dashboard.box.ticketLogMissing"),
			});
			return;
		}

		const file = this.plugin.app.vault.getFileByPath(mount.sourcePath);
		if (!(file instanceof TFile)) {
			mount.contentEl.createDiv({
				cls: "corvidae-box-ticket-empty",
				text: t("dashboard.box.ticketLogMissing"),
			});
			return;
		}

		const content = await this.plugin.app.vault.read(file);
		const displayMode = box.ticketDisplayMode ?? "last";
		mount.displayMode = displayMode;
		const markdown = resolveTicketLogMarkdown(content, displayMode);

		if (!markdown.trim()) {
			mount.contentEl.createDiv({
				cls: "corvidae-box-ticket-empty",
				text: t("dashboard.box.ticketLogEmpty"),
			});
			return;
		}

		const component = new Component();
		component.load();
		mount.renderComponent = component;

		await MarkdownRenderer.render(
			this.plugin.app,
			markdown,
			mount.contentEl,
			file.path,
			component
		);
	}

	resolveDevelopmentLogPath(projectId: string): string | null {
		if (!projectId) return null;
		const project = this.plugin.settings.ticketProjects.find(
			(entry) => entry.id === projectId
		);
		const path = project?.developmentLogPath?.trim();
		return path || null;
	}
}
