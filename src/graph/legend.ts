import { WorkspaceLeaf } from "obsidian";
import type { CorvidaeSettings } from "../settings";
import { isDashboardGraphEmbed } from "../dashboard/embed-workspace";
import { t } from "../i18n";
import type { LegendEntry } from "./patcher";
import type { GraphViewLike, WorkspaceLeafLike } from "./types";

const LEGEND_CLASS = "corvidae-legend";

export class LegendManager {
	constructor(private settings: CorvidaeSettings) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	syncLegends(graphLeaves: WorkspaceLeafLike[], entries: LegendEntry[]): void {
		for (const leaf of graphLeaves) {
			const view = leaf.view as unknown as GraphViewLike;
			if (!view?.containerEl) continue;

			view.containerEl.querySelector(`.${LEGEND_CLASS}`)?.remove();

			if (isDashboardGraphEmbed(leaf as WorkspaceLeaf)) continue;

			if (!this.settings.showLegend || entries.length === 0) continue;

			const container = view.containerEl;
			if (getComputedStyle(container).position === "static") {
				container.style.position = "relative";
			}

			const legend = container.createDiv({ cls: LEGEND_CLASS });
			legend.createDiv({ cls: "corvidae-legend-title", text: t("legend.title") });

			const list = legend.createDiv({ cls: "corvidae-legend-list" });

			for (const entry of entries) {
				const item = list.createDiv({ cls: "corvidae-legend-item" });
				const dot = item.createDiv({ cls: "corvidae-legend-dot" });
				dot.style.background = entry.color;
				dot.style.boxShadow = `0 0 4px ${entry.color}`;
				item.createSpan({ cls: "corvidae-legend-label", text: entry.alias });
			}
		}
	}

	removeAll(graphLeaves: WorkspaceLeafLike[]): void {
		for (const leaf of graphLeaves) {
			const view = leaf.view as unknown as GraphViewLike;
			view?.containerEl?.querySelector(`.${LEGEND_CLASS}`)?.remove();
		}
	}
}
