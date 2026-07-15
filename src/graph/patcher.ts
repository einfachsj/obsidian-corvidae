import { App, TFile } from "obsidian";
import { hexToPixi, normalizeHexColor, parseSize } from "../frontmatter/utils";
import type { CorvidaeSettings } from "../settings";
import type { GraphNode, GraphRenderer } from "./types";

export interface LegendEntry {
	alias: string;
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

	patchAllGraphs(graphLeaves: { view: unknown }[]): void {
		for (const leaf of graphLeaves) {
			const view = leaf.view as { renderer?: GraphRenderer };
			const renderer = view?.renderer;
			if (!renderer?.nodes) continue;
			this.patchRenderer(renderer);
		}
	}

	collectLegendEntries(graphLeaves: { view: unknown }[]): LegendEntry[] {
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

		return entries.sort((a, b) => a.alias.localeCompare(b.alias));
	}

	private patchRenderer(renderer: GraphRenderer): void {
		let changed = false;

		for (const node of renderer.nodes) {
			if (this.patchNode(node)) changed = true;
		}

		if (changed && typeof renderer.changed === "function") {
			renderer.changed();
		}
	}

	private patchNode(node: GraphNode): boolean {
		const file = this.app.vault.getAbstractFileByPath(node.id);
		if (!(file instanceof TFile)) return false;

		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		if (!frontmatter) return false;

		let changed = false;

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
		const file = this.app.vault.getAbstractFileByPath(node.id);
		if (!(file instanceof TFile)) return null;

		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		const explicitColor = this.getExplicitColor(frontmatter);
		const defaultColor = normalizeHexColor(this.settings.defaultColor);

		if (!this.settings.legendShowDefaultAndUncolored) {
			if (!explicitColor) return null;
			if (defaultColor && explicitColor === defaultColor) return null;

			return {
				alias: this.resolveAlias(frontmatter, file.basename),
				color: explicitColor,
			};
		}

		const color = explicitColor ?? defaultColor ?? this.settings.defaultColor;

		return {
			alias: this.resolveAlias(frontmatter, file.basename),
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

	private resolveAlias(
		frontmatter: Record<string, unknown> | undefined,
		basename: string
	): string {
		const aliases = frontmatter?.aliases;

		if (Array.isArray(aliases) && aliases.length > 0) {
			const first = aliases[0];
			if (first !== undefined && first !== null && String(first).trim()) {
				return String(first);
			}
		}

		if (typeof aliases === "string" && aliases.trim()) {
			return aliases.trim();
		}

		return basename;
	}
}
