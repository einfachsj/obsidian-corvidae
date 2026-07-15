import { App, TFile, TFolder } from "obsidian";
import { resolveFirstAlias } from "../frontmatter/utils";
import { getFolderNoteForFolder, isFolderNotePath } from "../folder-note";
import { LINK_PROPERTY } from "../properties/link";

export const LOCALE_OPTIONS: Intl.CollatorOptions = {
	sensitivity: "base",
	numeric: true,
};

export function normalizeLinkEntries(value: unknown): string[] {
	if (value === null || value === undefined || value === "") return [];
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed ? [trimmed] : [];
	}
	if (Array.isArray(value)) {
		return value
			.filter((item): item is string => typeof item === "string")
			.map((item) => item.trim())
			.filter(Boolean);
	}
	return [];
}

export function buildWikiLinkForFile(file: TFile): string {
	return `[[${file.basename}]]`;
}

export function getDirectChildPaths(app: App, folder: TFolder): Set<string> {
	const paths = new Set<string>();

	for (const child of folder.children) {
		if (child instanceof TFile) {
			if (child.extension === "md" && !isFolderNotePath(child.path)) {
				paths.add(child.path);
			}
			continue;
		}

		if (child instanceof TFolder) {
			const note = getFolderNoteForFolder(app, child);
			if (note) paths.add(note.path);
		}
	}

	return paths;
}

export function computeAutoLinks(app: App, folder: TFolder): string[] {
	const links: string[] = [];

	for (const child of folder.children) {
		if (child instanceof TFile) {
			if (child.extension === "md" && !isFolderNotePath(child.path)) {
				links.push(buildWikiLinkForFile(child));
			}
			continue;
		}

		if (child instanceof TFolder) {
			const note = getFolderNoteForFolder(app, child);
			if (note) links.push(buildWikiLinkForFile(note));
		}
	}

	return links;
}

export function resolveLinkToPath(
	app: App,
	link: string,
	sourcePath: string
): string | null {
	const match = link.match(/^\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]$/);
	if (!match) return null;

	const linktext = match[1].trim();
	const dest = app.metadataCache.getFirstLinkpathDest(linktext, sourcePath);
	return dest?.path ?? null;
}

function isAutoLink(
	app: App,
	link: string,
	sourcePath: string,
	childPaths: Set<string>
): boolean {
	const path = resolveLinkToPath(app, link, sourcePath);
	return path !== null && childPaths.has(path);
}

function getLinkSortKey(app: App, link: string, sourcePath: string): string {
	const path = resolveLinkToPath(app, link, sourcePath);
	if (!path) return link;

	const file = app.vault.getAbstractFileByPath(path);
	if (!(file instanceof TFile)) return link;

	const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
	return resolveFirstAlias(frontmatter, file.basename);
}

export function sortLinksByAlias(
	app: App,
	links: string[],
	sourcePath: string
): string[] {
	return [...links].sort((a, b) => {
		const byAlias = getLinkSortKey(app, a, sourcePath).localeCompare(
			getLinkSortKey(app, b, sourcePath),
			undefined,
			LOCALE_OPTIONS
		);
		if (byAlias !== 0) return byAlias;
		return a.localeCompare(b, undefined, LOCALE_OPTIONS);
	});
}

export function mergeAndSortLinks(
	app: App,
	folder: TFolder,
	folderNote: TFile,
	autoLinks: string[],
	currentLinks: string[]
): string[] {
	const sourcePath = folderNote.path;
	const childPaths = getDirectChildPaths(app, folder);

	const manualLinks = currentLinks.filter(
		(link) => !isAutoLink(app, link, sourcePath, childPaths)
	);

	const merged = new Map<string, string>();

	for (const link of autoLinks) {
		const path = resolveLinkToPath(app, link, sourcePath);
		if (path) merged.set(path, link);
	}

	for (const link of manualLinks) {
		const path = resolveLinkToPath(app, link, sourcePath);
		if (path) {
			if (!merged.has(path)) merged.set(path, link);
			continue;
		}
		merged.set(`manual:${link}`, link);
	}

	return sortLinksByAlias(app, [...merged.values()], sourcePath);
}

export function readCurrentLinks(app: App, folderNote: TFile): string[] {
	const frontmatter = app.metadataCache.getFileCache(folderNote)?.frontmatter;
	return normalizeLinkEntries(frontmatter?.[LINK_PROPERTY]);
}

export function linksEqual(a: string[], b: string[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((value, index) => value === b[index]);
}
