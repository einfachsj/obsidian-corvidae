import { App, TFile, WorkspaceLeaf } from "obsidian";
import type { CorvidaeSettings } from "../settings";
import { isDashboardGraphEmbed } from "../dashboard/embed-workspace";
import { isRecord } from "../frontmatter/utils";
import { t } from "../i18n";
import type { LegendEntry } from "./patcher";
import type { GraphViewLike, WorkspaceLeafLike } from "./types";

const LEGEND_CLASS = "corvidae-legend";

function asGraphView(view: unknown): GraphViewLike | null {
	if (!isRecord(view)) return null;
	const containerEl = view["containerEl"];
	if (
		!containerEl ||
		typeof containerEl !== "object" ||
		!(containerEl as Node).instanceOf?.(HTMLElement)
	) {
		return null;
	}
	return { containerEl: containerEl as HTMLElement };
}

function colorKey(hex: string): string {
	return hex.replace(/^#/, "").toLowerCase();
}

function displayColor(hex: string): string {
	return colorKey(hex).toUpperCase();
}

export class LegendManager {
	private selectedColorByLeaf = new WeakMap<object, string>();

	constructor(
		private app: App,
		private settings: CorvidaeSettings
	) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	syncLegends(graphLeaves: WorkspaceLeafLike[], entries: LegendEntry[]): void {
		for (const leaf of graphLeaves) {
			const view = asGraphView(leaf.view);
			if (!view) continue;

			if (isDashboardGraphEmbed(leaf as WorkspaceLeaf)) {
				view.containerEl.querySelector(`.${LEGEND_CLASS}`)?.remove();
				continue;
			}

			if (!this.settings.showLegend || entries.length === 0) {
				view.containerEl.querySelector(`.${LEGEND_CLASS}`)?.remove();
				continue;
			}

			const container = view.containerEl;
			container.addClass("corvidae-legend-host");

			const fingerprint = entries
				.map((e) => `${e.path}\0${e.color}\0${e.name}`)
				.sort()
				.join("\n");

			const existing = container.querySelector(`.${LEGEND_CLASS}`);
			if (
				existing instanceof HTMLElement &&
				existing.dataset.corvidaeFingerprint === fingerprint
			) {
				continue;
			}

			existing?.remove();

			const legend = container.createDiv({ cls: LEGEND_CLASS });
			legend.dataset.corvidaeFingerprint = fingerprint;
			legend.createDiv({ cls: "corvidae-legend-title", text: t("legend.title") });

			const colors = [...new Set(entries.map((e) => e.color))].sort((a, b) =>
				colorKey(a).localeCompare(colorKey(b))
			);

			const remembered = this.selectedColorByLeaf.get(leaf as object);
			const initialColor =
				remembered && colors.some((c) => colorKey(c) === colorKey(remembered))
					? remembered
					: colors[0];

			this.selectedColorByLeaf.set(leaf as object, initialColor);

			const filterRow = legend.createDiv({ cls: "corvidae-legend-filter" });
			const select = filterRow.createEl("select", {
				cls: "corvidae-legend-color-select",
				attr: { "aria-label": t("legend.filterColor") },
			});

			for (const color of colors) {
				const option = select.createEl("option", {
					text: displayColor(color),
					value: color,
				});
				if (colorKey(color) === colorKey(initialColor)) {
					option.selected = true;
				}
			}

			const list = legend.createDiv({ cls: "corvidae-legend-list" });

			const renderList = (selected: string) => {
				list.empty();
				const filtered = entries
					.filter((e) => colorKey(e.color) === colorKey(selected))
					.sort((a, b) => a.name.localeCompare(b.name));

				if (filtered.length === 0) {
					list.createDiv({
						cls: "corvidae-legend-empty",
						text: t("legend.empty"),
					});
					return;
				}

				for (const entry of filtered) {
					const item = list.createDiv({ cls: "corvidae-legend-item" });
					item.setAttr("role", "button");
					item.setAttr("tabindex", "0");
					const dot = item.createDiv({ cls: "corvidae-legend-dot" });
					dot.style.background = entry.color;
					dot.style.boxShadow = `0 0 4px ${entry.color}`;
					item.createSpan({ cls: "corvidae-legend-label", text: entry.name });

					const open = () => void this.openEntryInNewTab(entry.path);
					item.addEventListener("click", (evt) => {
						evt.preventDefault();
						evt.stopPropagation();
						open();
					});
					item.addEventListener("keydown", (evt) => {
						if (evt.key !== "Enter" && evt.key !== " ") return;
						evt.preventDefault();
						open();
					});
				}
			};

			renderList(initialColor);

			select.addEventListener("change", () => {
				const value = select.value;
				this.selectedColorByLeaf.set(leaf as object, value);
				renderList(value);
			});
		}
	}

	removeAll(graphLeaves: WorkspaceLeafLike[]): void {
		for (const leaf of graphLeaves) {
			const view = asGraphView(leaf.view);
			view?.containerEl?.querySelector(`.${LEGEND_CLASS}`)?.remove();
		}
	}

	private async openEntryInNewTab(path: string): Promise<void> {
		const file = this.app.vault.getAbstractFileByPath(path);
		if (!(file instanceof TFile)) return;
		const newLeaf = this.app.workspace.getLeaf("tab");
		await newLeaf.openFile(file, { active: true });
	}
}
