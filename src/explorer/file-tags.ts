/**
 * Explorer-Labels im Obsidian-Stil: <div class="nav-file-tag">
 */

import { App, TFile, TFolder } from "obsidian";
import { getExplorerTagLabel } from "../i18n";
import { getFolderNoteForFolder, isFolderNotePath } from "../folder-note";

export const CORVIDAE_TAG_CLASS = "corvidae-nav-file-tag";

export type ExplorerTag = "NOTE" | "DRAW" | "FOLDER" | "HYBRID";

/** Label für eine Datei – null = Obsidian-Standard beibehalten (.base usw.) */
export function getExplorerFileTag(app: App, file: TFile): ExplorerTag | null {
	if (file.extension === "base") return null;

	if (isExcalidrawFile(app, file)) return "DRAW";

	if (file.extension === "md" && !isFolderNotePath(file.path)) {
		return "NOTE";
	}

	return null;
}

/** Label für einen Ordner */
export function getExplorerFolderTag(app: App, folder: TFolder): ExplorerTag {
	return getFolderNoteForFolder(app, folder) ? "HYBRID" : "FOLDER";
}

export function isExcalidrawFile(app: App, file: TFile): boolean {
	if (file.path.endsWith(".excalidraw.md")) return true;

	const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
	if (!frontmatter) return false;

	if (frontmatter["excalidraw-plugin"] !== undefined) return true;

	const tags = frontmatter.tags;
	if (Array.isArray(tags) && tags.some((t) => String(t).toLowerCase() === "excalidraw")) {
		return true;
	}
	if (typeof tags === "string" && tags.toLowerCase().includes("excalidraw")) {
		return true;
	}

	return false;
}

export function applyExplorerTag(titleEl: HTMLElement, tag: ExplorerTag | null): void {
	const existing = titleEl.querySelector<HTMLElement>(
		`.nav-file-tag.${CORVIDAE_TAG_CLASS}`
	);

	if (!tag) {
		existing?.remove();
		return;
	}

	const tagEl = existing ?? titleEl.createDiv({
		cls: `nav-file-tag ${CORVIDAE_TAG_CLASS}`,
	});
	tagEl.textContent = getExplorerTagLabel(tag);
}

export function clearManagedExplorerTags(): void {
	document
		.querySelectorAll(`.nav-file-tag.${CORVIDAE_TAG_CLASS}`)
		.forEach((el) => el.remove());
}
