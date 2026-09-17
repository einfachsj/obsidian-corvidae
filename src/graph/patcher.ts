import { App, TFile, WorkspaceLeaf } from "obsidian";
import { isInsideSealedDevelopmentContent } from "../explorer/development-folders";
import { hexToPixi, normalizeHexColor, parseSize } from "../frontmatter/utils";
import type { CorvidaeSettings } from "../settings";
import { isDecoupleEmbedPath, isEmbedOnlyDecoupledEdge } from "./embed-links";
import { isFrontmatterLinkPropertyEdge } from "./frontmatter-links";
import type { GraphLink, GraphNode, GraphRenderer } from "./types";

export interface LegendEntry {
	name: string;
	path: string;
	color: string;
}

export class GraphPatcher {
	constructor(
		private app: App,
		private settings: CorvidaeSettings
	) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	patchAllGraphs(graphLeaves: WorkspaceLeaf[]): void {
		for (const leaf of graphLeaves) {
			const view = leaf.view as { renderer?: GraphRenderer };
			const renderer = view?.renderer;
			if (!renderer?.nodes) continue;
			this.patchRenderer(renderer);
		}
	}

	collectLegendEntries(graphLeaves: WorkspaceLeaf[]): LegendEntry[] {
		const entries: LegendEntry[] = [];
		const seen = new Set<string>();

		for (const leaf of graphLeaves) {
			const view = leaf.view as { renderer?: GraphRenderer };
			const nodes = view?.renderer?.nodes;
			if (!nodes) continue;

			for (const node of nodes) {
				if (seen.has(node.id)) continue;
				seen.add(node.id);

				const entry = this.getLegendEntryForNode(node);
				if (entry) entries.push(entry);
			}
		}

		return entries.sort((a, b) => a.name.localeCompare(b.name));
	}

	private patchRenderer(renderer: GraphRenderer): void {
		let changed = false;

		if (this.removeSealedDevelopmentNodes(renderer)) changed = true;

		for (const node of renderer.nodes) {
			if (this.patchNode(node, true)) changed = true;
		}

		if (this.decoupleNonFrontmatterLinks(renderer)) changed = true;
		if (this.decoupleEmbedOnlyLinks(renderer)) changed = true;

		if (changed && typeof renderer.changed === "function") {
			renderer.changed();
		}
	}


	/**
	 * Drop nodes under sealed development content (and their edges) from the
	 * renderer + force worker. Core recreates them on rebuild — we re-strip each patch.
	 */
	private removeSealedDevelopmentNodes(renderer: GraphRenderer): boolean {
		const folders = this.settings.developmentFolders;
		if (!folders.length) return false;

		const sealedIds = new Set<string>();
		for (const node of renderer.nodes) {
			if (isInsideSealedDevelopmentContent(node.id, folders)) {
				sealedIds.add(node.id);
			}
		}
		if (sealedIds.size === 0) return false;

		return this.removeNodeIds(renderer, sealedIds);
	}


	private removeNodeIds(renderer: GraphRenderer, removeIds: Set<string>): boolean {
		const links = renderer.links;
		if (links?.length) {
			const linksToRemove = links.filter(
				(link) =>
					removeIds.has(link.source.id) || removeIds.has(link.target.id)
			);
			for (const link of linksToRemove) {
				this.removeGraphLink(renderer, link);
			}
		}

		for (let i = renderer.nodes.length - 1; i >= 0; i--) {
			const node = renderer.nodes[i];
			if (!removeIds.has(node.id)) continue;
			this.clearNodeGraphics(node);
			renderer.nodes.splice(i, 1);
			if (renderer.nodeLookup && node.id in renderer.nodeLookup) {
				delete renderer.nodeLookup[node.id];
			}
		}

		this.resyncForceWorker(renderer);
		return true;
	}

	private clearNodeGraphics(node: GraphNode): void {
		if (typeof node.clearGraphics === "function") {
			node.clearGraphics();
		}
		if (typeof node.destroy === "function") {
			node.destroy();
		}
	}

	/**
	 * Keep only edges justified by the source note's frontmatter `link` property.
	 * Body wiki/embeds still navigate in notes; they no longer drive the graph.
	 * Core recreates edges on rebuild — we re-strip each patch.
	 */
	private decoupleNonFrontmatterLinks(renderer: GraphRenderer): boolean {
		if (!this.settings.graphOnlyFrontmatterLinks) return false;

		const links = renderer.links;
		if (!links?.length) return false;

		const toRemove: GraphLink[] = [];
		for (const link of links) {
			const sourceId = link.source.id;
			const targetId = link.target.id;
			if (isFrontmatterLinkPropertyEdge(this.app, sourceId, targetId)) continue;
			toRemove.push(link);
		}
		if (toRemove.length === 0) return false;

		for (const link of toRemove) {
			this.removeGraphLink(renderer, link);
		}

		this.resyncForceWorker(renderer);
		return true;
	}

	/**
	 * Remove embed-only `.base` / `.canvas` edges from the renderer and force worker
	 * (not just hide the line). Core recreates them on rebuild — we re-strip each patch.
	 */
	private decoupleEmbedOnlyLinks(renderer: GraphRenderer): boolean {
		if (!this.settings.graphHideBaseEmbedLinks) return false;

		const links = renderer.links;
		if (!links?.length) return false;

		const toRemove: GraphLink[] = [];
		for (const link of links) {
			const sourceId = link.source.id;
			const targetId = link.target.id;
			if (!isDecoupleEmbedPath(sourceId) && !isDecoupleEmbedPath(targetId)) continue;
			if (!isEmbedOnlyDecoupledEdge(this.app, sourceId, targetId)) continue;
			toRemove.push(link);
		}
		if (toRemove.length === 0) return false;

		for (const link of toRemove) {
			this.removeGraphLink(renderer, link);
		}

		this.resyncForceWorker(renderer);
		return true;
	}

	private removeGraphLink(renderer: GraphRenderer, link: GraphLink): void {
		if (typeof link.clearGraphics === "function") {
			link.clearGraphics();
		}

		const links = renderer.links;
		if (links) {
			const idx = links.indexOf(link);
			if (idx !== -1) links.splice(idx, 1);
		}

		const sourceId = link.source.id;
		const targetId = link.target.id;
		if (link.source.forward && targetId in link.source.forward) {
			delete link.source.forward[targetId];
		}
		if (link.target.reverse && sourceId in link.target.reverse) {
			delete link.target.reverse[sourceId];
		}
	}

	private resyncForceWorker(renderer: GraphRenderer): void {
		const worker = renderer.worker;
		if (!worker || typeof worker.postMessage !== "function") return;

		const nodes: Record<string, [number, number]> = {};
		for (const node of renderer.nodes) {
			const x = typeof node.x === "number" ? node.x : 0;
			const y = typeof node.y === "number" ? node.y : 0;
			nodes[node.id] = [x, y];
		}

		const pairs: [string, string][] = [];
		for (const link of renderer.links ?? []) {
			pairs.push([link.source.id, link.target.id]);
		}

		worker.postMessage({ nodes, links: pairs, alpha: 0.3, run: true });
	}

	private patchNode(node: GraphNode, respectSealed: boolean): boolean {
		if (
			respectSealed &&
			isInsideSealedDevelopmentContent(
				node.id,
				this.settings.developmentFolders
			)
		) {
			return false;
		}

		const file = this.app.vault.getAbstractFileByPath(node.id);
		if (!(file instanceof TFile)) return false;

		let changed = false;

		// Attachments: show basename only (no .wav / .jpg / …).
		if (file.extension !== "md" && node.text && node.text.text !== file.basename) {
			node.text.text = file.basename;
			changed = true;
		}

		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		if (!frontmatter) return changed;

		const parsedSize = parseSize(
			frontmatter[this.settings.sizeProperty],
			this.settings.minSize,
			this.settings.maxSize
		);
		if (parsedSize !== null && node.weight !== parsedSize) {
			node.weight = parsedSize;
			changed = true;
		}

		const hex = normalizeHexColor(frontmatter[this.settings.colorProperty]);
		if (hex) {
			const rgb = hexToPixi(hex);
			if (rgb !== null) {
				const current = node.color;
				if (!current || current.rgb !== rgb || current.a !== 1) {
					node.color = { a: 1, rgb };
					changed = true;
				}
			}
		}

		return changed;
	}

	private getLegendEntryForNode(node: GraphNode): LegendEntry | null {
		if (
			isInsideSealedDevelopmentContent(
				node.id,
				this.settings.developmentFolders
			)
		) {
			return null;
		}

		const file = this.app.vault.getAbstractFileByPath(node.id);
		if (!(file instanceof TFile)) return null;

		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		const explicitColor = this.getExplicitColor(frontmatter);
		const defaultColor = normalizeHexColor(this.settings.defaultColor);

		if (!this.settings.legendShowDefaultAndUncolored) {
			if (!explicitColor) return null;
			if (defaultColor && explicitColor === defaultColor) return null;

			return {
				name: file.basename,
				path: file.path,
				color: explicitColor,
			};
		}

		const color = explicitColor ?? defaultColor ?? this.settings.defaultColor;

		return {
			name: file.basename,
			path: file.path,
			color,
		};
	}

	private getExplicitColor(
		frontmatter: Record<string, unknown> | undefined
	): string | null {
		if (!frontmatter) return null;

		const raw = frontmatter[this.settings.colorProperty];
		if (raw === undefined || raw === null || raw === "") return null;

		return normalizeHexColor(raw);
	}
}
