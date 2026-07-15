import { MarkdownView, TFile } from "obsidian";
import type CorvidaePlugin from "../main";
import type { DashboardBox } from "./box-types";
import {
	createEmbeddedLeaf,
	destroyEmbeddedLeaf,
	type EmbeddedLeafMount,
	reattachEmbeddedLeaf,
} from "./embed-workspace";

interface NoteBoxMount {
	mount: EmbeddedLeafMount;
	notePath: string;
}

const NOTE_WORKSPACE_CLASS = "corvidae-box-note-workspace";

export class DashboardNoteBoxEmbed {
	private mounts = new Map<string, NoteBoxMount>();
	private syncTimer: number | null = null;

	constructor(private plugin: CorvidaePlugin) {}

	scheduleSync(
		noteBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.sync(noteBoxes, resolveHost);
		}, 0);
	}

	async sync(
		noteBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const activeIds = new Set(
			noteBoxes.filter((box) => box.notePath).map((box) => box.id)
		);

		for (const [boxId, entry] of this.mounts.entries()) {
			if (!activeIds.has(boxId)) {
				destroyEmbeddedLeaf(entry.mount);
				this.mounts.delete(boxId);
			}
		}

		for (const box of noteBoxes) {
			if (!box.notePath) continue;
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
		const notePath = box.notePath;
		if (!notePath) return;

		const file = this.plugin.app.vault.getFileByPath(notePath);
		if (!(file instanceof TFile)) return;

		let entry = this.mounts.get(box.id);

		if (!entry) {
			const mount = createEmbeddedLeaf(
				this.plugin.app.workspace,
				host,
				"vertical",
				NOTE_WORKSPACE_CLASS
			);
			entry = { mount, notePath };
			this.mounts.set(box.id, entry);
			await this.openNotePreview(mount, file);
		} else {
			reattachEmbeddedLeaf(entry.mount, host);
			if (entry.notePath !== notePath) {
				entry.notePath = notePath;
				await this.openNotePreview(entry.mount, file);
			} else {
				this.ensurePreviewMode(entry.mount);
			}
		}

		await entry.mount.leaf.loadIfDeferred();
		entry.mount.leaf.onResize();
	}

	private async openNotePreview(
		mount: EmbeddedLeafMount,
		file: TFile
	): Promise<void> {
		await mount.leaf.setViewState(
			{
				type: "markdown",
				state: { file: file.path, mode: "preview" },
				active: false,
			},
			{ focus: false }
		);
	}

	private ensurePreviewMode(mount: EmbeddedLeafMount): void {
		const view = mount.leaf.view;
		if (view instanceof MarkdownView && view.getMode() !== "preview") {
			void mount.leaf.setViewState(
				{
					type: "markdown",
					state: { file: view.file?.path, mode: "preview" },
					active: false,
				},
				{ focus: false }
			);
		}
	}
}
