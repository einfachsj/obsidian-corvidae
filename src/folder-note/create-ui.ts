/**
 * Explizite Folder-Note-Erstellung (Kontextmenü im Datei-Explorer).
 */

import { Menu, TAbstractFile, TFile, TFolder } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";

const ACTION_PRIMARY_SECTION = "action-primary";

function isFileExplorerMenu(source: string): boolean {
	return source.includes("file-explorer");
}

export class FolderNoteCreateUI {
	constructor(private plugin: CorvidaePlugin) {}

	onload(): void {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on("file-menu", (menu, file, source) => {
				if (!isFileExplorerMenu(source)) return;
				this.addMenuItem(menu, file);
			})
		);
	}

	onunload(): void {}

	refreshUi(): void {}

	private addMenuItem(menu: Menu, file: TAbstractFile): void {
		if (!this.plugin.settings.folderNoteEnabled) return;

		const parent = this.resolveParentFromFile(file);

		menu.addItem((item) => {
			item
				.setSection(ACTION_PRIMARY_SECTION)
				.setTitle(t("folderNote.menuTitle"))
				.setIcon("folder-tree")
				.onClick(() => {
					void this.plugin.createFolderNote(parent);
				});
		});
	}

	private resolveParentFromFile(file: TAbstractFile): TFolder | null {
		if (file instanceof TFolder) return file;
		if (file instanceof TFile) return file.parent;
		return this.resolveDefaultParent();
	}

	private resolveDefaultParent(): TFolder | null {
		const active = this.plugin.app.workspace.getActiveFile();
		if (active?.parent) return active.parent;

		const root = this.plugin.app.vault.getAbstractFileByPath("");
		return root instanceof TFolder ? root : null;
	}
}
