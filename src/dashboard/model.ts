import { App, TFile, TFolder } from "obsidian";
import { getFolderNoteForFolder } from "../folder-note";
import { normalizeHexColor, resolveFirstAlias, isRecord } from "../frontmatter/utils";
import type { CorvidaeSettings } from "../settings";

export interface DashboardProject {
	notePath: string;
	folderPath: string;
	displayName: string;
	color?: string;
	mtime: number;
}

function shouldSkipPath(path: string, settings: CorvidaeSettings): boolean {
	if (path.startsWith(".")) return true;

	for (const prefix of settings.folderNoteExcludePrefixes ?? []) {
		const normalized = prefix.replace(/\/$/, "");
		if (path === normalized || path.startsWith(`${normalized}/`)) {
			return true;
		}
	}

	return false;
}

function readProjectMeta(app: App, file: TFile, settings: CorvidaeSettings) {
	const cache = app.metadataCache.getFileCache(file);
	const frontmatter = isRecord(cache?.frontmatter)
		? (cache.frontmatter as Record<string, unknown>)
		: undefined;
	const colorRaw: unknown = frontmatter?.[settings.colorProperty];
	const color = normalizeHexColor(colorRaw) ?? undefined;

	return {
		displayName: resolveFirstAlias(frontmatter, file.basename),
		color,
		mtime: file.stat.mtime,
	};
}

export function collectDashboardProjects(
	app: App,
	settings: CorvidaeSettings
): DashboardProject[] {
	const root = app.vault.getRoot();
	const projects: DashboardProject[] = [];

	for (const child of root.children) {
		if (!(child instanceof TFolder)) continue;
		if (shouldSkipPath(child.path, settings)) continue;

		const folderNote = getFolderNoteForFolder(app, child);
		if (!folderNote) continue;

		const meta = readProjectMeta(app, folderNote, settings);
		projects.push({
			notePath: folderNote.path,
			folderPath: child.path,
			displayName: meta.displayName,
			color: meta.color,
			mtime: meta.mtime,
		});
	}

	projects.sort((a, b) =>
		a.displayName.localeCompare(b.displayName, undefined, {
			sensitivity: "base",
		})
	);

	return projects;
}
