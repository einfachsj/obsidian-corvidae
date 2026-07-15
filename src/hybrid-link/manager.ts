import { App, TAbstractFile, TFile, TFolder } from "obsidian";
import { getFolderNoteForFolder } from "../folder-note";
import { LINK_PROPERTY } from "../properties/link";
import type { CorvidaeSettings } from "../settings";
import {
	computeAutoLinks,
	linksEqual,
	mergeAndSortLinks,
	readCurrentLinks,
} from "./resolve";

const DEFER_SYNC_MS = 200;

export class HybridLinkManager {
	private readonly processing = new Set<string>();
	private readonly syncWritePaths = new Set<string>();
	private queue: Promise<void> = Promise.resolve();

	constructor(
		private app: App,
		private settings: CorvidaeSettings
	) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	scheduleSyncForFolder(folder: TFolder): void {
		if (!this.shouldSync(folder.path)) return;
		void this.schedule(`folder:${folder.path}`, () => this.syncFolder(folder));
	}

	scheduleSyncForParentOf(file: TAbstractFile): void {
		if (!this.settings.folderNoteEnabled) return;

		const parent = file.parent;
		if (!(parent instanceof TFolder) || parent.path === "") return;

		this.scheduleSyncForFolder(parent);
	}

	scheduleSyncForRename(file: TAbstractFile, oldPath: string): void {
		if (!this.settings.folderNoteEnabled) return;

		this.scheduleSyncForParentOf(file);

		const slash = oldPath.lastIndexOf("/");
		const oldParentPath = slash === -1 ? "" : oldPath.slice(0, slash);
		const oldParent = this.app.vault.getAbstractFileByPath(oldParentPath);
		if (oldParent instanceof TFolder) {
			this.scheduleSyncForFolder(oldParent);
		}
	}

	scheduleSyncForMetadataChange(file: TFile): void {
		if (!this.settings.folderNoteEnabled) return;
		if (this.syncWritePaths.has(file.path)) return;

		const parent = file.parent;
		if (!(parent instanceof TFolder) || parent.path === "") return;

		const folderNote = getFolderNoteForFolder(this.app, parent);
		if (!folderNote || file.path === folderNote.path) return;

		this.scheduleSyncForFolder(parent);
	}

	private async syncFolder(folder: TFolder): Promise<void> {
		const folderNote = getFolderNoteForFolder(this.app, folder);
		if (!folderNote) return;

		const autoLinks = computeAutoLinks(this.app, folder);
		const currentLinks = readCurrentLinks(this.app, folderNote);
		const mergedLinks = mergeAndSortLinks(
			this.app,
			folder,
			folderNote,
			autoLinks,
			currentLinks
		);

		if (linksEqual(currentLinks, mergedLinks)) return;

		await this.withProcessing([folder.path, folderNote.path], async () => {
			this.syncWritePaths.add(folderNote.path);
			try {
				await this.app.fileManager.processFrontMatter(folderNote, (fm) => {
					fm[LINK_PROPERTY] = mergedLinks;
				});
			} finally {
				window.setTimeout(() => {
					this.syncWritePaths.delete(folderNote.path);
				}, 300);
			}
		});
	}

	private shouldSync(path: string): boolean {
		if (!this.settings.folderNoteEnabled) return false;

		for (const prefix of this.settings.folderNoteExcludePrefixes) {
			const normalized = prefix.replace(/\/$/, "");
			if (path === normalized || path.startsWith(`${normalized}/`)) {
				return false;
			}
		}

		return true;
	}

	private schedule<T>(key: string, task: () => Promise<T>): Promise<T> {
		return this.enqueue(async () => {
			await this.defer(DEFER_SYNC_MS);
			if (this.processing.has(key)) return undefined as T;
			try {
				return await task();
			} catch (error) {
				console.debug("CORVIDAE hybrid-link:", error);
				return undefined as T;
			}
		});
	}

	private defer(ms: number): Promise<void> {
		return new Promise((resolve) => window.setTimeout(resolve, ms));
	}

	private enqueue<T>(task: () => Promise<T>): Promise<T> {
		const run = this.queue.then(task, task);
		this.queue = run.then(
			() => undefined,
			() => undefined
		);
		return run;
	}

	private async withProcessing<T>(
		paths: string[],
		action: () => Promise<T>
	): Promise<T> {
		for (const path of paths) this.processing.add(path);
		try {
			return await action();
		} finally {
			for (const path of paths) this.processing.delete(path);
		}
	}
}
