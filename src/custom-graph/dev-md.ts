/**
 * Custom Graph: hierarchy tree mirrored into {folder}/dev.md.
 */

import { App } from "obsidian";
import { normalizeFolderPath } from "../explorer/development-folders";
import type { CustomGraphConfig } from "../settings";
import { buildHierarchyModel, hierarchyToDevMdEntries, resolveProjectFolder } from "./hierarchy";
import type { DevMdNodeEntry } from "./model";
import {
	DEV_MD_BASENAME,
	getDevMdPath,
	isDevMdPath,
	resolveCodeScanRoot,
} from "./paths";

export {
	DEV_MD_BASENAME,
	getDevMdPath,
	isDevMdPath,
	resolveCodeScanRoot,
} from "./paths";

export const DEV_GRAPH_FRONTMATTER_KEY = "corvidae-dev-graph";
export const DEV_ROOT_FRONTMATTER_KEY = "dev-root";
export const DEV_NODES_FRONTMATTER_KEY = "nodes";

export function createCustomGraphId(): string {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return `custom-graph-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getConfiguredCustomGraphs(
	graphs: readonly CustomGraphConfig[]
): CustomGraphConfig[] {
	return graphs.filter((graph) => normalizeFolderPath(graph.folder).length > 0);
}

export function findCustomGraphById(
	graphs: readonly CustomGraphConfig[],
	id: string
): CustomGraphConfig | undefined {
	return graphs.find((graph) => graph.id === id);
}

export function isAnyCustomGraphDevMd(
	path: string,
	graphs: readonly CustomGraphConfig[]
): boolean {
	return graphs.some((graph) => {
		const project = resolveProjectFolder(graph.folder, graph.codeFolder ?? "");
		return (
			isDevMdPath(path, project) || isDevMdPath(path, graph.folder)
		);
	});
}

function nodesEqual(a: DevMdNodeEntry[], b: DevMdNodeEntry[]): boolean {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (
			a[i].path !== b[i].path ||
			a[i].kind !== b[i].kind ||
			(a[i].parent ?? "") !== (b[i].parent ?? "")
		) {
			return false;
		}
	}
	return true;
}

function readStoredNodes(raw: unknown): DevMdNodeEntry[] {
	if (!Array.isArray(raw)) return [];
	const out: DevMdNodeEntry[] = [];
	for (const item of raw) {
		if (!item || typeof item !== "object") continue;
		const rec = item as Record<string, unknown>;
		if (typeof rec.path !== "string") continue;
		if (rec.kind !== "folder" && rec.kind !== "file") continue;
		const entry: DevMdNodeEntry = { path: rec.path, kind: rec.kind };
		if (typeof rec.parent === "string" && rec.parent) entry.parent = rec.parent;
		out.push(entry);
	}
	return out;
}

export async function syncDevMd(
	app: App,
	graph: Pick<CustomGraphConfig, "folder" | "codeFolder">
): Promise<number> {
	const configured = normalizeFolderPath(graph.folder);
	if (!configured) return 0;

	const project = resolveProjectFolder(graph.folder, graph.codeFolder ?? "");
	const abstract = app.vault.getAbstractFileByPath(configured);
	if (!abstract && !app.vault.getAbstractFileByPath(project)) return 0;

	const model = buildHierarchyModel(
		app,
		configured,
		graph.codeFolder ?? ""
	);
	const entries = hierarchyToDevMdEntries(model);
	const scanRoot = model.scanRoot;
	const destinPath = getDevMdPath(project);

	let file = app.vault.getFileByPath(destinPath);
	if (!file) {
		file = await app.vault.create(
			destinPath,
			[
				"---",
				`${DEV_GRAPH_FRONTMATTER_KEY}: true`,
				`${DEV_ROOT_FRONTMATTER_KEY}: ${JSON.stringify(scanRoot)}`,
				`${DEV_NODES_FRONTMATTER_KEY}: []`,
				"---",
				"",
				"# Dev Graph",
				"",
				"Open this note to view the folder structure graph.",
				"",
			].join("\n")
		);
	}

	const fm = app.metadataCache.getFileCache(file)?.frontmatter;
	const currentRoot =
		typeof fm?.[DEV_ROOT_FRONTMATTER_KEY] === "string"
			? fm[DEV_ROOT_FRONTMATTER_KEY]
			: "";
	const currentNodes = readStoredNodes(fm?.[DEV_NODES_FRONTMATTER_KEY]);

	if (currentRoot === scanRoot && nodesEqual(currentNodes, entries)) {
		return entries.length;
	}

	await app.fileManager.processFrontMatter(file, (frontmatter) => {
		frontmatter[DEV_GRAPH_FRONTMATTER_KEY] = true;
		frontmatter[DEV_ROOT_FRONTMATTER_KEY] = scanRoot;
		frontmatter[DEV_NODES_FRONTMATTER_KEY] = entries;
		delete frontmatter.link;
	});

	return entries.length;
}

export async function syncAllDevMd(
	app: App,
	graphs: readonly CustomGraphConfig[]
): Promise<void> {
	for (const graph of getConfiguredCustomGraphs(graphs)) {
		await syncDevMd(app, graph);
	}
}
