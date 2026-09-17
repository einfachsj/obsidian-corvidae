/**
 * Build folder/file hierarchy under a scan root for the Database Graph.
 */

import { App, TFile, TFolder, normalizePath } from "obsidian";
import { normalizeFolderPath } from "../explorer/development-folders";
import { getDevMdPath, resolveCodeScanRoot } from "./paths";
import type { DevGraphEdge, DevGraphModel, DevGraphNode, DevMdNodeEntry } from "./model";

function basename(path: string): string {
	const parts = path.split("/");
	return parts[parts.length - 1] || path;
}

function parentPath(path: string): string | null {
	const idx = path.lastIndexOf("/");
	if (idx <= 0) return null;
	return path.slice(0, idx);
}

/** e.g. `src/utils/types.ts` → `utils_types.ts` */
function fileNodeLabel(path: string): string {
	const name = basename(path);
	const parent = parentPath(path);
	if (!parent) return name;
	return `${basename(parent)}_${name}`;
}

function isUnderScanRoot(path: string, scanRoot: string): boolean {
	return path === scanRoot || path.startsWith(`${scanRoot}/`);
}

/** Collect folder + file nodes and parent→child edges under scan root. */
export function buildHierarchyModel(
	app: App,
	folder: string,
	codeFolder = ""
): DevGraphModel {
	const projectRoot = normalizeFolderPath(folder);
	const scanRoot = resolveCodeScanRoot(folder, codeFolder);
	const nodes: DevGraphNode[] = [];
	const edges: DevGraphEdge[] = [];
	const seen = new Set<string>();

	if (!projectRoot || !scanRoot) {
		return { nodes, edges, scanRoot: scanRoot || projectRoot };
	}

	const destinPath = getDevMdPath(projectRoot);
	const prefix = `${scanRoot}/`;

	const ensureFolder = (folderPath: string): void => {
		const normalized = normalizeFolderPath(folderPath);
		if (!normalized || seen.has(normalized)) return;
		if (!isUnderScanRoot(normalized, scanRoot)) return;

		const parent = parentPath(normalized);
		if (parent && isUnderScanRoot(parent, scanRoot)) {
			ensureFolder(parent);
		}

		seen.add(normalized);
		const parentId =
			normalized === scanRoot
				? null
				: parent && isUnderScanRoot(parent, scanRoot)
					? parent
					: null;

		nodes.push({
			id: normalized,
			path: normalized,
			label: basename(normalized),
			kind: "folder",
			parentId,
		});

		if (parentId) {
			edges.push({ source: parentId, target: normalized });
		}
	};

	ensureFolder(scanRoot);

	const abstract = app.vault.getAbstractFileByPath(scanRoot);
	if (abstract instanceof TFolder) {
		const walk = (folderObj: TFolder): void => {
			for (const child of folderObj.children) {
				if (child instanceof TFolder) {
					ensureFolder(child.path);
					walk(child);
					continue;
				}
				if (!(child instanceof TFile)) continue;
				if (child.path === destinPath) continue;
				if (!child.path.startsWith(prefix)) continue;

				const parent = parentPath(child.path) ?? scanRoot;
				ensureFolder(parent);

				if (seen.has(child.path)) continue;
				seen.add(child.path);
				nodes.push({
					id: child.path,
					path: child.path,
					label: fileNodeLabel(child.path),
					kind: "file",
					parentId: parent,
				});
				edges.push({ source: parent, target: child.path });
			}
		};
		walk(abstract);
	} else {
		for (const file of app.vault.getFiles()) {
			if (!file.path.startsWith(prefix)) continue;
			if (file.path === destinPath) continue;
			const parent = parentPath(file.path);
			if (parent) ensureFolder(parent);
			if (seen.has(file.path)) continue;
			seen.add(file.path);
			const parentId = parent && seen.has(parent) ? parent : scanRoot;
			nodes.push({
				id: file.path,
				path: file.path,
				label: fileNodeLabel(file.path),
				kind: "file",
				parentId,
			});
			if (parentId) edges.push({ source: parentId, target: file.path });
		}
	}

	nodes.sort((a, b) => a.path.localeCompare(b.path));
	return { nodes, edges, scanRoot };
}

export function hierarchyToDevMdEntries(model: DevGraphModel): DevMdNodeEntry[] {
	const out: DevMdNodeEntry[] = [];
	for (const n of model.nodes) {
		if (n.kind !== "folder" && n.kind !== "file") continue;
		const entry: DevMdNodeEntry = {
			path: n.path,
			kind: n.kind,
		};
		if (n.parentId) entry.parent = n.parentId;
		out.push(entry);
	}
	return out;
}

export function findGraphIdForDevMdPath(
	devMdPath: string,
	graphs: readonly { id: string; folder: string; codeFolder?: string }[]
): string | null {
	const normalized = normalizePath(devMdPath);
	for (const graph of graphs) {
		const project = resolveProjectFolder(graph.folder, graph.codeFolder ?? "");
		if (!project) continue;
		if (getDevMdPath(project) === normalized) return graph.id;
		// Legacy: destin.md was written under the configured folder field
		const legacy = normalizeFolderPath(graph.folder);
		if (legacy && getDevMdPath(legacy) === normalized) return graph.id;
	}
	return null;
}

/**
 * Match explorer folder click to a Custom Graph.
 * Accepts the project folder itself, or a parent of a mis-set folder/code path
 * (e.g. click `…/corvidae-v-2.0.0` when folder is `…/corvidae-v-2.0.0/src`).
 */
export function findGraphIdForFolderPath(
	folderPath: string,
	graphs: readonly { id: string; folder: string; codeFolder?: string }[]
): string | null {
	const normalized = normalizeFolderPath(folderPath);
	if (!normalized) return null;

	let bestId: string | null = null;
	let bestScore = -1;

	for (const graph of graphs) {
		const configured = normalizeFolderPath(graph.folder);
		if (!configured) continue;
		const project = resolveProjectFolder(graph.folder, graph.codeFolder ?? "");
		const scan = resolveCodeScanRoot(graph.folder, graph.codeFolder ?? "");

		let score = -1;
		if (project === normalized || configured === normalized) score = 4;
		else if (scan === normalized) score = 3;
		else if (configured.startsWith(`${normalized}/`)) score = 2;
		else if (scan.startsWith(`${normalized}/`)) score = 2;
		else if (project.startsWith(`${normalized}/`)) score = 1;

		if (score > bestScore) {
			bestScore = score;
			bestId = graph.id;
		}
	}

	return bestId;
}

/**
 * Project root for destin.md / explorer click.
 * If `folder` was set to a typical code root (`src`, `lib`, …), peel to its parent.
 */
export function resolveProjectFolder(folder: string, codeFolder = ""): string {
	const configured = normalizeFolderPath(folder);
	if (!configured) return "";

	const leaf = configured.slice(configured.lastIndexOf("/") + 1).toLowerCase();
	const codeLeaves = new Set(["src", "lib", "app", "source"]);
	if (!codeLeaves.has(leaf)) return configured;

	const parent = configured.includes("/")
		? configured.slice(0, configured.lastIndexOf("/"))
		: "";
	return parent || configured;
}
