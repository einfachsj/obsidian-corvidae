/**
 * Explorer: Ordner sind klickbare Notizen, Folder-Notes werden ausgeblendet.
 */

import { App, Plugin, TAbstractFile, TFile, TFolder } from "obsidian";
import { getFolderNoteForFolder, isFolderNotePath } from "../folder-note";
import type { CorvidaeSettings } from "../settings";
import {
	applyExplorerTag,
	clearManagedExplorerTags,
	getExplorerFileTag,
	getExplorerFolderTag,
} from "./file-tags";
import { FileExplorerAliasSortPatch } from "./file-explorer-patch";

const FOLDER_CLASS = "corvidae-folder-note";
const FILE_HIDDEN_CLASS = "corvidae-folder-note-hidden";

function isHtmlElement(value: EventTarget | null): value is HTMLElement {
	return value !== null && (value as Node).instanceOf?.(HTMLElement) === true;
}

export class ExplorerManager {
	private observer: MutationObserver | null = null;
	private folderRefreshTimer: number | null = null;
	private fileExplorerPatch: FileExplorerAliasSortPatch;

	constructor(
		private app: App,
		private plugin: Plugin,
		private settings: CorvidaeSettings
	) {
		this.fileExplorerPatch = new FileExplorerAliasSortPatch(
			this.app,
			() => this.hideEnabled()
		);
	}

	onload(): void {
		this.plugin.registerDomEvent(document, "click", this.onClick, {
			capture: true,
		});
		this.plugin.registerDomEvent(document, "auxclick", this.onAuxClick, {
			capture: true,
		});

		this.plugin.registerEvent(
			this.app.workspace.on("layout-change", () => {
				this.fileExplorerPatch.tryInstallAndSort();
				this.hideAllFolderNotes();
				this.scheduleFolderRefresh();
			})
		);
		this.plugin.registerEvent(
			this.app.vault.on("create", (file: TAbstractFile) => {
				if (file instanceof TFile) {
					this.hideFolderNotePath(file.path);
				}
				this.scheduleFolderRefresh();
			})
		);
		this.plugin.registerEvent(
			this.app.vault.on("delete", () => this.scheduleFolderRefresh())
		);
		this.plugin.registerEvent(
			this.app.vault.on("rename", (file: TAbstractFile) => {
				if (file instanceof TFile) {
					this.hideFolderNotePath(file.path);
				}
				this.scheduleFolderRefresh();
			})
		);
		this.plugin.registerEvent(
			this.app.metadataCache.on("changed", (file) => {
				this.scheduleFolderRefresh();
				if (file instanceof TFile) {
					this.fileExplorerPatch.scheduleSortRefresh();
				}
			})
		);
		this.plugin.registerEvent(
			this.app.metadataCache.on("resolved", () => {
				this.scheduleFolderRefresh();
				this.fileExplorerPatch.scheduleSortRefresh();
			})
		);
		this.plugin.registerEvent(
			this.app.vault.on("modify", (file) => {
				if (file instanceof TFile && file.extension === "md") {
					this.fileExplorerPatch.scheduleSortRefresh();
				}
			})
		);

		this.app.workspace.onLayoutReady(() => {
			for (const delay of [0, 150, 750]) {
				window.setTimeout(() => {
					this.fileExplorerPatch.tryInstallAndSort();
				}, delay);
			}
		});

		this.plugin.registerEvent(
			this.app.workspace.on("active-leaf-change", (leaf) => {
				if (!leaf || leaf.view.getViewType() !== "file-explorer") return;
				this.fileExplorerPatch.tryInstallAndSort();
			})
		);

		this.setupObserver();
		this.fileExplorerPatch.tryInstallAndSort();
		this.hideAllFolderNotes();
		this.refreshExplorerUi();
	}

	onunload(): void {
		this.observer?.disconnect();
		this.observer = null;
		if (this.folderRefreshTimer !== null) {
			window.clearTimeout(this.folderRefreshTimer);
			this.folderRefreshTimer = null;
		}
		this.fileExplorerPatch.uninstallPatch();
		this.clearAllMarks();
	}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
		if (!this.settings.folderNoteHideInExplorer) {
			this.unhideAllFolderNotes();
		} else {
			this.hideAllFolderNotes();
		}
		this.fileExplorerPatch.requestSort();
		this.fileExplorerPatch.scheduleSortRefresh();
	}

	scheduleFolderRefresh(): void {
		if (this.folderRefreshTimer !== null) {
			window.clearTimeout(this.folderRefreshTimer);
		}
		this.folderRefreshTimer = window.setTimeout(() => {
			this.folderRefreshTimer = null;
			this.refreshExplorerUi();
		}, 50);
	}

	private hideEnabled(): boolean {
		return this.settings.folderNoteEnabled && this.settings.folderNoteHideInExplorer;
	}

	private folderClickEnabled(): boolean {
		return this.settings.folderNoteEnabled && this.settings.folderNoteOpenOnClick;
	}

	private setupObserver(): void {
		const attach = (): void => {
			const container = document.querySelector(".nav-files-container");
			if (!container || this.observer) return;

			this.observer = new MutationObserver((mutations) => {
				if (this.hideEnabled()) {
					for (const mutation of mutations) {
						for (const node of Array.from(mutation.addedNodes)) {
							this.hideFolderNotesInNode(node);
						}
					}
				}
				this.scheduleFolderRefresh();
			});
			this.observer.observe(container, { childList: true, subtree: true });
		};

		attach();
		this.plugin.registerEvent(this.app.workspace.on("layout-change", attach));
	}

	private hideFolderNotePath(path: string): void {
		if (!this.hideEnabled() || !isFolderNotePath(path)) return;
		this.applyHideToPath(path);
	}

	private applyHideToPath(path: string): void {
		const title = document.querySelector<HTMLElement>(
			`.nav-files-container .nav-file-title[data-path="${CSS.escape(path)}"]`
		);
		title?.closest(".nav-file")?.classList.add(FILE_HIDDEN_CLASS);
	}

	private hideFolderNotesInNode(node: Node): void {
		if (node.instanceOf(HTMLElement)) {
			if (node.matches(".nav-file-title[data-path]")) {
				this.maybeHideTitle(node);
			}
			for (const title of Array.from(
				node.querySelectorAll<HTMLElement>(".nav-file-title[data-path]")
			)) {
				this.maybeHideTitle(title);
			}
		}
	}

	private maybeHideTitle(title: HTMLElement): void {
		const path = title.dataset.path;
		if (!path || !isFolderNotePath(path)) return;
		title.closest(".nav-file")?.classList.add(FILE_HIDDEN_CLASS);
	}

	private hideAllFolderNotes(): void {
		if (!this.hideEnabled()) return;

		for (const title of Array.from(
			document.querySelectorAll<HTMLElement>(
				".nav-files-container .nav-file-title[data-path]"
			)
		)) {
			this.maybeHideTitle(title);
		}
	}

	private unhideAllFolderNotes(): void {
		document
			.querySelectorAll(`.nav-files-container .${FILE_HIDDEN_CLASS}`)
			.forEach((el) => el.classList.remove(FILE_HIDDEN_CLASS));
	}

	private clearFolderMarks(): void {
		document
			.querySelectorAll(`.${FOLDER_CLASS}`)
			.forEach((el) => el.classList.remove(FOLDER_CLASS));
	}

	private clearAllMarks(): void {
		this.clearFolderMarks();
		this.unhideAllFolderNotes();
		clearManagedExplorerTags();
	}

	private refreshExplorerUi(): void {
		this.fileExplorerPatch.tryInstallAndSort();
		this.refreshFolderMarks();
		this.refreshFileTags();
		this.hideAllFolderNotes();
	}

	private refreshFileTags(): void {
		clearManagedExplorerTags();

		for (const title of Array.from(
			document.querySelectorAll<HTMLElement>(
				".nav-files-container .nav-file-title[data-path]"
			)
		)) {
			const path = title.dataset.path;
			if (!path) continue;
			if (isFolderNotePath(path) && this.hideEnabled()) continue;

			const file = this.app.vault.getAbstractFileByPath(path);
			if (!(file instanceof TFile)) continue;

			applyExplorerTag(title, getExplorerFileTag(this.app, file));
		}

		for (const title of Array.from(
			document.querySelectorAll<HTMLElement>(
				".nav-files-container .nav-folder-title[data-path]"
			)
		)) {
			const folderPath = title.dataset.path;
			if (!folderPath) continue;

			const folder = this.app.vault.getAbstractFileByPath(folderPath);
			if (!(folder instanceof TFolder)) continue;

			applyExplorerTag(title, getExplorerFolderTag(this.app, folder));
		}
	}

	private refreshFolderMarks(): void {
		this.clearFolderMarks();
		if (!this.folderClickEnabled()) return;

		for (const title of Array.from(
			document.querySelectorAll<HTMLElement>(
				".nav-files-container .nav-folder-title[data-path]"
			)
		)) {
			const folderPath = title.dataset.path;
			if (!folderPath) continue;

			const folder = this.app.vault.getAbstractFileByPath(folderPath);
			if (!(folder instanceof TFolder)) continue;
			if (!getFolderNoteForFolder(this.app, folder)) continue;

			title.closest(".nav-folder")?.classList.add(FOLDER_CLASS);
		}
	}

	private isFolderTitleClick(target: EventTarget | null): boolean {
		if (!isHtmlElement(target)) return false;
		return !!target.closest(".nav-folder-title-content");
	}

	private isCollapseClick(target: EventTarget | null): boolean {
		if (!isHtmlElement(target)) return false;
		return !!target.closest(".nav-folder-collapse-indicator");
	}

	private getFolderFromClick(target: EventTarget | null): TFolder | null {
		if (!isHtmlElement(target)) return null;
		if (!target.closest(".nav-files-container")) return null;

		const folderEl = target.closest(".nav-folder");
		const titleEl = folderEl?.querySelector<HTMLElement>(
			":scope > .nav-folder-title"
		);
		const folderPath = titleEl?.dataset.path;
		if (!folderPath) return null;

		const folder = this.app.vault.getAbstractFileByPath(folderPath);
		return folder instanceof TFolder ? folder : null;
	}

	private async openFolderNote(folder: TFolder, newLeaf: boolean): Promise<void> {
		const note = getFolderNoteForFolder(this.app, folder);
		if (!note) return;

		await this.app.workspace.openLinkText(note.path, "", newLeaf, {
			active: true,
		});
	}

	private onClick = (evt: MouseEvent): void => {
		if (!this.folderClickEnabled()) return;
		if (evt.shiftKey || evt.button !== 0) return;
		if (this.isCollapseClick(evt.target)) return;
		if (!this.isFolderTitleClick(evt.target)) return;

		const folder = this.getFolderFromClick(evt.target);
		if (!folder || !getFolderNoteForFolder(this.app, folder)) return;

		const newLeaf = evt.ctrlKey || evt.metaKey;
		window.setTimeout(() => void this.openFolderNote(folder, newLeaf), 0);
	};

	private onAuxClick = (evt: MouseEvent): void => {
		if (!this.folderClickEnabled()) return;
		if (evt.button !== 1) return;
		if (this.isCollapseClick(evt.target)) return;
		if (!this.isFolderTitleClick(evt.target)) return;

		const folder = this.getFolderFromClick(evt.target);
		if (!folder || !getFolderNoteForFolder(this.app, folder)) return;

		window.setTimeout(() => void this.openFolderNote(folder, true), 0);
	};
}
