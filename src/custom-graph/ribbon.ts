import type { Plugin } from "obsidian";
import { t } from "../i18n";
import type { CustomGraphConfig } from "../settings";
import { normalizeFolderPath } from "../explorer/development-folders";

interface RibbonEntry {
	graphId: string;
	buttonEl: HTMLElement;
	badgeEl: HTMLElement;
}

/**
 * One ribbon icon per Custom Graph in settings (badge 1, 2, …).
 * A new icon appears as soon as a graph entry is added.
 */
export class CustomGraphRibbon {
	private entries: RibbonEntry[] = [];

	constructor(
		private plugin: Plugin,
		private onOpen: (graphId: string) => void
	) {}

	onload(): void {
		/* Icons are created in syncFromSettings when graphs exist. */
	}

	syncFromSettings(graphs: readonly CustomGraphConfig[]): void {
		const list = [...graphs];
		const wantedIds = new Set(list.map((graph) => graph.id));

		for (let i = this.entries.length - 1; i >= 0; i--) {
			if (!wantedIds.has(this.entries[i].graphId)) {
				this.entries[i].buttonEl.remove();
				this.entries.splice(i, 1);
			}
		}

		const existingIds = new Set(this.entries.map((entry) => entry.graphId));

		for (const graph of list) {
			if (existingIds.has(graph.id)) continue;
			this.addEntry(graph);
		}

		const order = new Map(list.map((graph, index) => [graph.id, index]));
		this.entries.sort(
			(a, b) => (order.get(a.graphId) ?? 0) - (order.get(b.graphId) ?? 0)
		);

		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			const graph = list.find((item) => item.id === entry.graphId);
			const label = this.tooltipFor(graph, i + 1);
			entry.buttonEl.setAttribute("aria-label", label);
			entry.buttonEl.setAttribute("title", label);
			entry.badgeEl.setText(String(i + 1));
			entry.badgeEl.show();
		}
	}

	refreshTooltips(graphs: readonly CustomGraphConfig[]): void {
		const list = [...graphs];
		for (let i = 0; i < this.entries.length; i++) {
			const entry = this.entries[i];
			const graph = list.find((item) => item.id === entry.graphId);
			const label = this.tooltipFor(graph, i + 1);
			entry.buttonEl.setAttribute("aria-label", label);
			entry.buttonEl.setAttribute("title", label);
		}
	}

	private addEntry(graph: CustomGraphConfig): void {
		const graphId = graph.id;
		const buttonEl = this.plugin.addRibbonIcon(
			"git-fork",
			graph.name.trim() || t("customGraph.ribbonTooltip"),
			() => {
				this.onOpen(graphId);
			}
		);
		buttonEl.addClass("corvidae-custom-graph-ribbon");
		buttonEl.dataset.corvidaeCustomGraphId = graphId;

		const badgeEl = buttonEl.createSpan({
			cls: "corvidae-custom-graph-ribbon-badge",
		});

		this.entries.push({ graphId, buttonEl, badgeEl });
	}

	private tooltipFor(
		graph: CustomGraphConfig | undefined,
		index: number
	): string {
		const name = graph?.name.trim();
		const folder = graph ? normalizeFolderPath(graph.folder) : "";
		if (name) return `${name} (${index})`;
		if (folder) return `${folder} (${index})`;
		return `${t("customGraph.ribbonTooltip")} ${index}`;
	}
}
