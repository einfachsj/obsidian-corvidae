/**
 * Bidirektionales Folder-Note-System:
 * - Neue Notiz  → gleichnamiger Ordner (Name/Name.md)
 * - Neuer Ordner → gleichnamige Notiz (Name/Name.md)
 */

import { App, TFile, TFolder } from "obsidian";
import { t } from "../i18n";
import type { CorvidaeSettings } from "../settings";
import {
	folderPathFromNotePath,
	getFolderNoteForFolder,
	isFolderNotePath,
	notePathForFolder,
	resolveUniqueFolderNotePath,
} from "./paths";

const DEFER_RENAME_MS = 200;

export class FolderNoteManager {
	private readonly processing = new Set<string>();
	private queue: Promise<void> = Promise.resolve();

	constructor(
		private app: App,
		private settings: CorvidaeSettings
	) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	/** Explizit: Ordner + Name/Name.md anlegen */
	async createFolderNote(parent: TFolder | null): Promise<TFile | null> {
		if (!this.settings.folderNoteEnabled) return null;

		const parentPath = parent?.path ?? "";
		if (parentPath && this.isExcluded(parentPath)) return null;

		const { folderPath, notePath } = resolveUniqueFolderNotePath(
			(path) => this.app.vault.getAbstractFileByPath(path) !== null,
			parentPath,
			t("folderNote.defaultName")
		);

		return this.withProcessing([folderPath, notePath], async () => {
			if (!this.app.vault.getAbstractFileByPath(folderPath)) {
				await this.safeCreateFolder(folderPath);
			}
			return this.safeCreate(notePath, "");
		});
	}

	onNoteRename(file: TFile, oldPath: string): Promise<void> {
		return this.schedule(`${oldPath}\0${file.path}`, () =>
			this.handleNoteRename(file, oldPath),
			DEFER_RENAME_MS
		);
	}

	onFolderRename(folder: TFolder, oldPath: string): Promise<void> {
		return this.schedule(`${oldPath}\0${folder.path}`, () =>
			this.handleFolderRename(folder, oldPath),
			DEFER_RENAME_MS
		);
	}

	private async handleNoteRename(file: TFile, oldPath: string): Promise<void> {
		if (this.isExcluded(file.path) && this.isExcluded(oldPath)) return;
		if (this.isProcessing(file.path) || this.isProcessing(oldPath)) return;
		if (!this.settings.folderNoteEnabled || !this.settings.folderNoteSyncRename) return;

		const current = this.app.vault.getFileByPath(file.path);
		if (!current || !isFolderNotePath(oldPath)) return;

		await this.syncFolderWithNoteRename(current, oldPath);
	}

	private async handleFolderRename(folder: TFolder, oldPath: string): Promise<void> {
		if (!this.shouldHandleFolder(folder.path) && !this.shouldHandleFolder(oldPath)) return;
		if (this.isProcessing(folder.path) || this.isProcessing(oldPath)) return;
		if (!this.settings.folderNoteSyncRename) return;

		const current = this.app.vault.getAbstractFileByPath(folder.path);
		if (!(current instanceof TFolder)) return;

		const oldName = oldPath.split("/").pop() ?? "";
		await this.reconcileFolderNoteAfterRename(current, oldName);
	}

	/** Nach Ordner-Umbenennung: Altname.md → Neuname.md */
	private async reconcileFolderNoteAfterRename(
		folder: TFolder,
		oldName: string
	): Promise<void> {
		const targetPath = notePathForFolder(folder.path, folder.name);
		if (this.app.vault.getAbstractFileByPath(targetPath) instanceof TFile) return;

		const misnamed = folder.children.find(
			(child) =>
				child instanceof TFile &&
				child.extension === "md" &&
				child.basename === oldName
		);
		if (!(misnamed instanceof TFile)) return;

		await this.safeRename(misnamed, targetPath);
	}

	private async adoptOrMoveNote(file: TFile, notePath: string): Promise<TFile> {
		const existing = this.app.vault.getAbstractFileByPath(notePath);

		if (existing instanceof TFile && existing.path !== file.path) {
			try {
				const [sourceContent, targetContent] = await Promise.all([
					this.app.vault.read(file),
					this.app.vault.read(existing),
				]);

				if (targetContent.trim() === "" && sourceContent.trim() !== "") {
					await this.app.vault.modify(existing, sourceContent);
				}

				if (file.path !== existing.path) {
					await this.app.vault.delete(file);
				}
			} catch {
				return existing;
			}
			return existing;
		}

		if (file.path === notePath) return file;
		return this.safeRename(file, notePath);
	}

	private async syncFolderWithNoteRename(file: TFile, oldPath: string): Promise<void> {
		const oldFolderPath = folderPathFromNotePath(oldPath);
		const oldBase = oldPath.slice(oldPath.lastIndexOf("/") + 1, -3);
		const newBase = file.basename;
		const newParent = file.parent;

		if (!newParent) return;

		const folder = this.app.vault.getAbstractFileByPath(oldFolderPath);
		if (!(folder instanceof TFolder)) return;

		const grandparentPath = oldFolderPath.includes("/")
			? oldFolderPath.slice(0, oldFolderPath.lastIndexOf("/"))
			: "";

		if (newParent.path === oldFolderPath && newBase !== oldBase) {
			const targetFolderPath = grandparentPath
				? `${grandparentPath}/${newBase}`
				: newBase;
			const targetFilePath = notePathForFolder(targetFolderPath, newBase);

			await this.withProcessing(
				[file.path, oldFolderPath, targetFolderPath, targetFilePath],
				async () => {
					const latestFile = this.app.vault.getFileByPath(file.path);
					if (!latestFile) return;

					const existingFolder = this.app.vault.getAbstractFileByPath(targetFolderPath);
					if (existingFolder && existingFolder.path !== folder.path) {
						await this.adoptOrMoveNote(latestFile, targetFilePath);
						return;
					}

					if (folder.path !== targetFolderPath) {
						await this.safeRename(folder, targetFolderPath);
					}

					const current = this.app.vault.getFileByPath(latestFile.path);
					if (current && current.path !== targetFilePath) {
						await this.safeRename(current, targetFilePath);
					}
				}
			);
			return;
		}

		if (isFolderNotePath(file.path)) return;
	}

	private async safeCreateFolder(path: string): Promise<TFolder | null> {
		const existing = this.app.vault.getAbstractFileByPath(path);
		if (existing instanceof TFolder) return existing;
		if (existing) return null;

		try {
			return await this.app.vault.createFolder(path);
		} catch {
			const resolved = this.app.vault.getAbstractFileByPath(path);
			return resolved instanceof TFolder ? resolved : null;
		}
	}

	private async safeCreate(path: string, content: string): Promise<TFile | null> {
		if (this.app.vault.getAbstractFileByPath(path)) return null;
		try {
			return await this.app.vault.create(path, content);
		} catch {
			return this.app.vault.getFileByPath(path);
		}
	}

	private async safeRename(file: TFile, newPath: string): Promise<TFile>;
	private async safeRename(file: TFolder, newPath: string): Promise<void>;
	private async safeRename(
		file: TFile | TFolder,
		newPath: string
	): Promise<TFile | void> {
		if (file.path === newPath) {
			return file instanceof TFile ? file : undefined;
		}

		const existing = this.app.vault.getAbstractFileByPath(newPath);
		if (existing) {
			if (file instanceof TFile && existing instanceof TFile) {
				return this.adoptOrMoveNote(file, newPath);
			}
			return file instanceof TFile ? file : undefined;
		}

		try {
			await this.app.fileManager.renameFile(file, newPath);
		} catch {
			const resolved = this.app.vault.getAbstractFileByPath(newPath);
			if (file instanceof TFile && resolved instanceof TFile) {
				return resolved;
			}
			return file instanceof TFile ? file : undefined;
		}

		if (file instanceof TFile) {
			return this.app.vault.getFileByPath(newPath) ?? file;
		}
	}

	private shouldHandleFolder(path: string): boolean {
		return this.settings.folderNoteEnabled && !this.isExcluded(path);
	}

	private isExcluded(path: string): boolean {
		for (const prefix of this.settings.folderNoteExcludePrefixes) {
			const normalized = prefix.replace(/\/$/, "");
			if (path === normalized || path.startsWith(`${normalized}/`)) {
				return true;
			}
		}
		return false;
	}

	private isProcessing(path: string): boolean {
		return this.processing.has(path);
	}

	private schedule<T>(
		key: string,
		task: () => Promise<T>,
		deferMs = DEFER_RENAME_MS
	): Promise<T> {
		return this.enqueue(async () => {
			await this.defer(deferMs);
			try {
				return await task();
			} catch (error) {
				console.debug("CORVIDAE folder-note:", error);
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
