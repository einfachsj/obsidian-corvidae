import { FuzzySuggestModal, ItemView, setIcon, TFile, WorkspaceLeaf } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import { normalizeFolderPath } from "../explorer/development-folders";
import type { CustomGraphConfig } from "../settings";
import { isRecord } from "../frontmatter/utils";
import {
	findCustomGraphById,
	getConfiguredCustomGraphs,
} from "./dev-md";
import { buildHierarchyModel } from "./hierarchy";
import {
	functionNodeId,
	isCodeFilePath,
	parseFunctionsFromSource,
} from "./function-parse";
import type { DevGraphEdge, DevGraphNode } from "./model";
import { HierarchyRenderer } from "./renderer";

export const CORVIDAE_CUSTOM_GRAPH_VIEW = "corvidae-custom-graph";

const EDGE_LENGTH_MIN = 40;
const EDGE_LENGTH_MAX = 280;
const EDGE_LENGTH_DEFAULT = 110;
const FUNCTIONS_ICON = "braces";

export interface CorvidaeCustomGraphState {
	graphId?: string;
	showFunctions?: boolean;
	edgeLength?: number;
}

export class CorvidaeCustomGraphView extends ItemView {
	private plugin: CorvidaePlugin;
	private graphId = "";
	private showFunctions = false;
	private edgeLength = EDGE_LENGTH_DEFAULT;
	private toolbarEl: HTMLElement | null = null;
	private hostEl: HTMLElement | null = null;
	private emptyEl: HTMLElement | null = null;
	private renderer: HierarchyRenderer | null = null;

	constructor(leaf: WorkspaceLeaf, plugin: CorvidaePlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return CORVIDAE_CUSTOM_GRAPH_VIEW;
	}

	getDisplayText(): string {
		const graph = findCustomGraphById(
			this.plugin.settings.customGraphs,
			this.graphId
		);
		const name = graph?.name.trim();
		return name || t("customGraph.viewTitle");
	}

	getIcon(): string {
		return "git-fork";
	}

	getState(): Record<string, unknown> {
		return {
			graphId: this.graphId,
			showFunctions: this.showFunctions,
			edgeLength: this.edgeLength,
		};
	}

	getGraphId(): string {
		return this.graphId;
	}

	async setState(
		state: unknown,
		result: Parameters<ItemView["setState"]>[1]
	): Promise<void> {
		await super.setState(state, result);
		if (isRecord(state)) {
			if (typeof state.graphId === "string") this.graphId = state.graphId;
			if (typeof state.showFunctions === "boolean") {
				this.showFunctions = state.showFunctions;
			}
			if (typeof state.edgeLength === "number" && Number.isFinite(state.edgeLength)) {
				this.edgeLength = clampEdgeLength(state.edgeLength);
			}
		}
		this.updateTabTitle();
		await this.refresh();
	}

	async onOpen(): Promise<void> {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("corvidae-custom-graph-view");

		this.toolbarEl = contentEl.createDiv({ cls: "corvidae-custom-graph-toolbar" });
		this.emptyEl = contentEl.createDiv({ cls: "corvidae-custom-graph-empty" });
		this.hostEl = contentEl.createDiv({ cls: "corvidae-custom-graph-host" });

		this.renderToolbar();
		this.updateTabTitle();
		await this.refresh();
	}

	async onClose(): Promise<void> {
		this.renderer?.destroy();
		this.renderer = null;
		this.toolbarEl = null;
		this.hostEl = null;
		this.emptyEl = null;
		this.contentEl.empty();
	}

	async refresh(): Promise<void> {
		if (!this.hostEl || !this.emptyEl || !this.toolbarEl) return;

		this.updateTabTitle();
		this.renderToolbar();

		const graph = findCustomGraphById(
			this.plugin.settings.customGraphs,
			this.graphId
		);
		const folder = graph ? normalizeFolderPath(graph.folder) : "";

		if (!folder) {
			this.renderer?.destroy();
			this.renderer = null;
			this.hostEl.hide();
			this.emptyEl.show();
			this.emptyEl.empty();
			this.emptyEl.createEl("p", { text: t("customGraph.empty") });
			return;
		}

		this.emptyEl.hide();
		this.hostEl.show();

		const model = buildHierarchyModel(
			this.plugin.app,
			folder,
			graph?.codeFolder ?? ""
		);
		let nodes: DevGraphNode[] = model.nodes.slice();
		let edges: DevGraphEdge[] = model.edges.slice();

		if (this.showFunctions) {
			const extra = await this.loadFunctionNodes(nodes);
			nodes = nodes.concat(extra.nodes);
			edges = edges.concat(extra.edges);
		}

		if (!this.renderer) {
			this.renderer = new HierarchyRenderer(this.hostEl, {
				onNodeClick: (node) => {
					void this.handleNodeClick(node);
				},
			});
		}
		this.renderer.setLinkDistance(this.edgeLength);
		this.renderer.setData(nodes, edges);
		this.renderer.resize();
	}

	/** Keep the tab title in sync with the Settings name. */
	updateTabTitle(): void {
		const title = this.getDisplayText();
		const leaf = this.leaf as WorkspaceLeaf & {
			updateHeader?: () => void;
			tabHeaderInnerTitleEl?: HTMLElement;
		};
		leaf.updateHeader?.();
		if (leaf.tabHeaderInnerTitleEl) {
			leaf.tabHeaderInnerTitleEl.setText(title);
		}
	}

	private renderToolbar(): void {
		if (!this.toolbarEl) return;
		this.toolbarEl.empty();

		const btn = this.toolbarEl.createEl("button", {
			cls: "corvidae-custom-graph-bonus-btn",
			attr: {
				type: "button",
				"aria-label": this.showFunctions
					? t("customGraph.bonus.on")
					: t("customGraph.bonus.off"),
				title: this.showFunctions
					? t("customGraph.bonus.on")
					: t("customGraph.bonus.off"),
				"aria-pressed": this.showFunctions ? "true" : "false",
			},
		});
		if (this.showFunctions) btn.addClass("is-active");
		setIcon(btn, FUNCTIONS_ICON);
		btn.addEventListener("click", () => {
			this.showFunctions = !this.showFunctions;
			void this.refresh();
		});

		const edgeControl = this.toolbarEl.createDiv({
			cls: "corvidae-custom-graph-edge-control",
		});
		edgeControl.createEl("label", {
			cls: "corvidae-custom-graph-edge-label",
			text: t("customGraph.edgeLength"),
			attr: { for: "corvidae-cg-edge-length" },
		});
		const slider = edgeControl.createEl("input", {
			cls: "corvidae-custom-graph-edge-slider",
			attr: {
				id: "corvidae-cg-edge-length",
				type: "range",
				min: String(EDGE_LENGTH_MIN),
				max: String(EDGE_LENGTH_MAX),
				step: "5",
				value: String(this.edgeLength),
				"aria-label": t("customGraph.edgeLength"),
			},
		});
		slider.addEventListener("input", () => {
			this.edgeLength = clampEdgeLength(Number(slider.value));
			this.renderer?.setLinkDistance(this.edgeLength);
			this.app.workspace.requestSaveLayout();
		});
	}

	private async loadFunctionNodes(
		fileNodes: DevGraphNode[]
	): Promise<{ nodes: DevGraphNode[]; edges: DevGraphEdge[] }> {
		const nodes: DevGraphNode[] = [];
		const edges: DevGraphEdge[] = [];

		for (const fileNode of fileNodes) {
			if (fileNode.kind !== "file") continue;
			if (!isCodeFilePath(fileNode.path)) continue;
			const file = this.plugin.app.vault.getFileByPath(fileNode.path);
			if (!(file instanceof TFile)) continue;

			try {
				const source = await this.plugin.app.vault.cachedRead(file);
				const parsed = parseFunctionsFromSource(source);
				for (const fn of parsed) {
					const id = functionNodeId(fileNode.path, fn.name, fn.index);
					nodes.push({
						id,
						path: id,
						label: fn.name,
						kind: "function",
						parentId: fileNode.id,
						filePath: fileNode.path,
					});
					edges.push({ source: fileNode.id, target: id });
				}
			} catch {
				/* ignore unreadable files */
			}
		}

		return { nodes, edges };
	}

	private async handleNodeClick(node: DevGraphNode): Promise<void> {
		if (node.kind === "file") {
			const file = this.plugin.app.vault.getFileByPath(node.path);
			if (file instanceof TFile) {
				await this.plugin.app.workspace.getLeaf(false).openFile(file, {
					active: true,
				});
			}
			return;
		}

		if (node.kind === "function" && node.filePath) {
			const file = this.plugin.app.vault.getFileByPath(node.filePath);
			if (file instanceof TFile) {
				await this.plugin.app.workspace.getLeaf(false).openFile(file, {
					active: true,
				});
			}
			return;
		}

		if (node.kind === "folder") {
			const folder = this.plugin.app.vault.getAbstractFileByPath(node.path);
			if (folder) {
				// Reveal in file explorer when possible
				const explorer = this.plugin.app.workspace.getLeavesOfType(
					"file-explorer"
				)[0];
				const view = explorer?.view as {
					revealInFolder?: (file: unknown) => void;
				} | null;
				view?.revealInFolder?.(folder);
			}
		}
	}
}

export class CustomGraphPickModal extends FuzzySuggestModal<CustomGraphConfig> {
	constructor(
		private plugin: CorvidaePlugin,
		private onPick: (graph: CustomGraphConfig) => void
	) {
		super(plugin.app);
		this.setPlaceholder(t("customGraph.pickPlaceholder"));
	}

	getItems(): CustomGraphConfig[] {
		return getConfiguredCustomGraphs(this.plugin.settings.customGraphs);
	}

	getItemText(item: CustomGraphConfig): string {
		const name = item.name.trim();
		const folder = normalizeFolderPath(item.folder);
		if (name && folder) return `${name} (${folder})`;
		return name || folder;
	}

	onChooseItem(item: CustomGraphConfig): void {
		this.onPick(item);
	}
}

function clampEdgeLength(value: number): number {
	return Math.max(EDGE_LENGTH_MIN, Math.min(EDGE_LENGTH_MAX, Math.round(value)));
}
