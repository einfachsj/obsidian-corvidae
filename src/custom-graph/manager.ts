import { MarkdownView, Notice, TAbstractFile, TFile, TFolder } from "obsidian";
import type CorvidaePlugin from "../main";
import { normalizeFolderPath } from "../explorer/development-folders";
import { t } from "../i18n";
import {
	findCustomGraphById,
	getConfiguredCustomGraphs,
	isAnyCustomGraphDevMd,
	resolveCodeScanRoot,
	syncAllDevMd,
} from "./dev-md";
import { findGraphIdForDevMdPath, findGraphIdForFolderPath } from "./hierarchy";
import { CustomGraphRibbon } from "./ribbon";
import {
	CORVIDAE_CUSTOM_GRAPH_VIEW,
	CorvidaeCustomGraphView,
	CustomGraphPickModal,
} from "./view";

export class CustomGraphManager {
	private ribbon: CustomGraphRibbon;
	private syncTimer: number | null = null;
	private syncing = false;
	private openingDevMd = false;

	constructor(private plugin: CorvidaePlugin) {
		this.ribbon = new CustomGraphRibbon(plugin, (graphId) => {
			void this.openGraph(graphId);
		});
	}

	onload(): void {
		this.ribbon.onload();
		this.updateRibbon();

		this.plugin.registerEvent(
			this.plugin.app.vault.on("create", (file) => {
				this.onVaultChange(file);
			})
		);
		this.plugin.registerEvent(
			this.plugin.app.vault.on("delete", (file) => {
				this.onVaultChange(file);
			})
		);
		this.plugin.registerEvent(
			this.plugin.app.vault.on("rename", (file, _oldPath) => {
				this.onVaultChange(file);
			})
		);

		this.plugin.registerEvent(
			this.plugin.app.workspace.on("file-open", (file) => {
				if (!file || this.openingDevMd) return;
				const graphId = findGraphIdForDevMdPath(
					file.path,
					this.plugin.settings.customGraphs
				);
				if (!graphId) return;
				void this.openGraphReplacingActiveLeaf(graphId);
			})
		);

		this.plugin.registerEvent(
			this.plugin.app.workspace.on("active-leaf-change", (leaf) => {
				if (!leaf || this.openingDevMd) return;
				const view = leaf.view;
				if (!(view instanceof MarkdownView) || !view.file) return;
				const graphId = findGraphIdForDevMdPath(
					view.file.path,
					this.plugin.settings.customGraphs
				);
				if (!graphId) return;
				void this.openGraphReplacingActiveLeaf(graphId);
			})
		);

		this.plugin.registerDomEvent(
			document,
			"click",
			(evt: MouseEvent) => {
				this.onExplorerDevClick(evt);
			},
			{ capture: true }
		);

		this.plugin.app.workspace.onLayoutReady(() => {
			void this.syncAndRefresh();
		});
	}

	onLanguageChanged(): void {
		this.ribbon.refreshTooltips(this.plugin.settings.customGraphs);
		void this.refreshOpenViews();
	}

	onSettingsChanged(): void {
		this.updateRibbon();
		this.scheduleSync();
		void this.refreshOpenViews();
	}

	scheduleSync(): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}
		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.syncAndRefresh();
		}, 300);
	}

	async syncAndRefresh(): Promise<void> {
		if (this.syncing) {
			this.scheduleSync();
			return;
		}

		this.syncing = true;
		try {
			await syncAllDevMd(
				this.plugin.app,
				this.plugin.settings.customGraphs
			);
			this.updateRibbon();
			await this.refreshOpenViews();
			this.plugin.explorerManager.scheduleFolderRefresh();
		} finally {
			this.syncing = false;
		}
	}

	updateRibbon(): void {
		this.ribbon.syncFromSettings(this.plugin.settings.customGraphs);
	}

	async activate(): Promise<void> {
		const graphs = getConfiguredCustomGraphs(this.plugin.settings.customGraphs);
		if (graphs.length === 0) {
			new Notice(t("customGraph.notice.noFolder"));
			return;
		}

		if (graphs.length === 1) {
			await this.openGraph(graphs[0].id);
			return;
		}

		new CustomGraphPickModal(this.plugin, (graph) => {
			void this.openGraph(graph.id);
		}).open();
	}

	async openGraph(graphId: string): Promise<void> {
		const graph = findCustomGraphById(
			this.plugin.settings.customGraphs,
			graphId
		);
		if (!graph || !normalizeFolderPath(graph.folder)) {
			new Notice(t("customGraph.notice.noFolder"));
			return;
		}

		await this.syncAndRefresh();

		const existing = this.plugin.app.workspace
			.getLeavesOfType(CORVIDAE_CUSTOM_GRAPH_VIEW)
			.find((leaf) => {
				const view = leaf.view;
				return (
					view instanceof CorvidaeCustomGraphView &&
					view.getGraphId() === graphId
				);
			});

		if (existing) {
			await this.plugin.app.workspace.revealLeaf(existing);
			if (existing.view instanceof CorvidaeCustomGraphView) {
				await existing.view.refresh();
				existing.view.updateTabTitle();
			}
			return;
		}

		const leaf = this.plugin.app.workspace.getLeaf(true);
		await leaf.setViewState({
			type: CORVIDAE_CUSTOM_GRAPH_VIEW,
			state: { graphId },
			active: true,
		});
		if (leaf.view instanceof CorvidaeCustomGraphView) {
			leaf.view.updateTabTitle();
		}
	}

	private onExplorerDevClick(evt: MouseEvent): void {
		if (evt.button !== 0 || evt.shiftKey) return;
		const target = evt.target;
		if (!(target instanceof Element)) return;
		if (!target.closest(".nav-files-container")) return;
		// Don't steal the collapse chevron (sealed projects hide it anyway).
		if (
			target.closest(
				".nav-folder-collapse-indicator, .tree-item-icon.collapse-icon"
			)
		) {
			return;
		}

		const graphs = this.plugin.settings.customGraphs;

		const fileTitle = target.closest<HTMLElement>(
			".nav-file-title[data-path], .tree-item-self.nav-file-title[data-path]"
		);
		if (fileTitle?.dataset.path) {
			const graphId = findGraphIdForDevMdPath(fileTitle.dataset.path, graphs);
			if (graphId) {
				evt.preventDefault();
				evt.stopPropagation();
				void this.openGraph(graphId);
			}
			return;
		}

		const folderTitle = target.closest<HTMLElement>(
			".nav-folder-title[data-path], .tree-item-self.nav-folder-title[data-path], .tree-item-self[data-path]"
		);
		const folderPath = folderTitle?.dataset.path;
		if (!folderPath) return;

		// Only treat as folder if it is a vault folder (not a file path)
		const abstract = this.plugin.app.vault.getAbstractFileByPath(folderPath);
		if (!(abstract instanceof TFolder)) return;

		const graphId = findGraphIdForFolderPath(folderPath, graphs);
		if (!graphId) return;

		evt.preventDefault();
		evt.stopPropagation();
		void this.openGraph(graphId);
	}

	private async openGraphReplacingActiveLeaf(graphId: string): Promise<void> {
		if (this.openingDevMd) return;
		this.openingDevMd = true;
		try {
			const markdown = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
			const leaf = markdown?.leaf ?? this.plugin.app.workspace.getLeaf(false);
			await leaf.setViewState({
				type: CORVIDAE_CUSTOM_GRAPH_VIEW,
				state: { graphId },
				active: true,
			});
			if (leaf.view instanceof CorvidaeCustomGraphView) {
				leaf.view.updateTabTitle();
			}
			void this.syncAndRefresh();
		} finally {
			this.openingDevMd = false;
		}
	}

	private onVaultChange(file: TAbstractFile): void {
		const graphs = getConfiguredCustomGraphs(this.plugin.settings.customGraphs);
		if (graphs.length === 0) return;

		if (file instanceof TFile && isAnyCustomGraphDevMd(file.path, graphs)) {
			return;
		}

		const path = file.path;
		for (const graph of graphs) {
			const folder = normalizeFolderPath(graph.folder);
			const scanRoot = resolveCodeScanRoot(folder, graph.codeFolder ?? "");
			const roots = [folder, scanRoot].filter(Boolean);
			for (const root of roots) {
				const prefix = `${root}/`;
				if (path === root || path.startsWith(prefix)) {
					this.scheduleSync();
					return;
				}
				if (file instanceof TFolder && root.startsWith(`${path}/`)) {
					this.scheduleSync();
					return;
				}
			}
		}
	}

	private async refreshOpenViews(): Promise<void> {
		for (const leaf of this.plugin.app.workspace.getLeavesOfType(
			CORVIDAE_CUSTOM_GRAPH_VIEW
		)) {
			if (leaf.view instanceof CorvidaeCustomGraphView) {
				await leaf.view.refresh();
				leaf.view.updateTabTitle();
			}
		}
	}
}
