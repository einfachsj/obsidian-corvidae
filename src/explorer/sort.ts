import { App, TFile, TFolder } from "obsidian";
import { resolveFirstAlias } from "../frontmatter/utils";
import { getFolderNoteForFolder } from "../folder-note";

const LOCALE_OPTIONS: Intl.CollatorOptions = {
	sensitivity: "base",
	numeric: true,
};

export function getExplorerSortKey(app: App, path: string): string {
	const file = app.vault.getAbstractFileByPath(path);
	if (file instanceof TFile) {
		const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
		return resolveFirstAlias(frontmatter, file.basename);
	}

	if (file instanceof TFolder) {
		const note = getFolderNoteForFolder(app, file);
		if (note) {
			const frontmatter = app.metadataCache.getFileCache(note)?.frontmatter;
			return resolveFirstAlias(frontmatter, file.name);
		}
		return file.name;
	}

	const name = path.split("/").pop() ?? path;
	return name.replace(/\.[^./]+$/, "");
}

export function compareExplorerPaths(app: App, a: string, b: string): number {
	const byAlias = getExplorerSortKey(app, a).localeCompare(
		getExplorerSortKey(app, b),
		undefined,
		LOCALE_OPTIONS
	);
	if (byAlias !== 0) return byAlias;

	return a.localeCompare(b, undefined, LOCALE_OPTIONS);
}
