import { OpenViewState, PaneType, TFile, ViewState, WorkspaceLeaf } from "obsidian";
import type CorvidaePlugin from "../main";
import type { DashboardBox } from "./box-types";
import {
	createEmbeddedLeaf,
	destroyEmbeddedLeaf,
	getEmbeddedRootSplit,
	getLeafContainerEl,
	type EmbeddedLeafMount,
	reattachEmbeddedLeaf,
} from "./embed-workspace";

const PATCH_MARKER = "__corvidaeGraphNavPatched";

type PatchedLeaf = WorkspaceLeaf & {
	[PATCH_MARKER]?: boolean;
	__corvidaeOrigOpenFile?: WorkspaceLeaf["openFile"];
	__corvidaeOrigSetViewState?: WorkspaceLeaf["setViewState"];
};

export class DashboardGraphBoxEmbed {
	private mounts = new Map<string, EmbeddedLeafMount>();
	private syncTimer: number | null = null;
	private cleanupTimer: number | null = null;
	private redirecting = false;
	private originalOpenLinkText:
		| ((
				linktext: string,
				sourcePath: string,
				newLeaf?: PaneType | boolean,
				openViewState?: OpenViewState
		  ) => Promise<void>)
		| null = null;

	constructor(private plugin: CorvidaePlugin) {}

	onload(): void {
		const workspace = this.plugin.app.workspace;
		this.originalOpenLinkText = workspace.openLinkText.bind(workspace);

		this.plugin.registerEvent(
			this.plugin.app.workspace.on("layout-change", () => {
				this.scheduleCleanup();
			})
		);
	}

	onunload(): void {
		if (this.originalOpenLinkText) {
			this.plugin.app.workspace.openLinkText = this.originalOpenLinkText;
			this.originalOpenLinkText = null;
		}
	}

	getLeaves(): WorkspaceLeaf[] {
		return [...this.mounts.values()].map((mount) => mount.leaf);
	}

	scheduleSync(
		graphBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): void {
		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.sync(graphBoxes, resolveHost);
		}, 0);
	}

	async sync(
		graphBoxes: DashboardBox[],
		resolveHost: (boxId: string) => HTMLElement | null
	): Promise<void> {
		const activeIds = new Set(graphBoxes.map((box) => box.id));

		for (const [boxId, mount] of this.mounts.entries()) {
			if (!activeIds.has(boxId)) {
				destroyEmbeddedLeaf(mount);
				this.mounts.delete(boxId);
			}
		}

		for (const box of graphBoxes) {
			const host = resolveHost(box.id);
			if (!host) continue;
			await this.mount(box.id, host);
		}

		this.plugin.refreshGraphFeatures();
	}

	detachAll(): void {
		for (const mount of this.mounts.values()) {
			destroyEmbeddedLeaf(mount);
		}
		this.mounts.clear();
	}

	private scheduleCleanup(): void {
		if (this.redirecting) return;
		if (this.cleanupTimer !== null) {
			window.clearTimeout(this.cleanupTimer);
		}
		this.cleanupTimer = window.setTimeout(() => {
			this.cleanupTimer = null;
			void this.cleanupEmbeddedNoteViews();
		}, 0);
	}

	private async openInMainTab(file: TFile, openInNewTab: boolean): Promise<void> {
		if (!this.originalOpenLinkText || this.redirecting) return;

		this.redirecting = true;
		try {
			await this.originalOpenLinkText(file.path, "", openInNewTab, {
				active: true,
			});
		} finally {
			this.redirecting = false;
		}
	}

	private async cleanupEmbeddedNoteViews(): Promise<void> {
		if (this.redirecting) return;

		for (const mount of this.mounts.values()) {
			const root = getEmbeddedRootSplit(mount);
			const extras: Array<{ leaf: WorkspaceLeaf; file: TFile }> = [];

			this.plugin.app.workspace.iterateAllLeaves((leaf) => {
				if (!root.contains(getLeafContainerEl(leaf))) return;
				if (leaf.view?.getViewType?.() === "graph") return;

				const file = (leaf.view as { file?: TFile }).file;
				if (file instanceof TFile) {
					extras.push({ leaf, file });
				}
			});

			for (const { leaf, file } of extras) {
				leaf.detach();
				await this.openInMainTab(file, leaf !== mount.leaf);
			}

			if (mount.leaf.view?.getViewType?.() !== "graph") {
				const file = (mount.leaf.view as { file?: TFile }).file;
				if (file instanceof TFile) {
					await this.openInMainTab(file, false);
				}
				await this.restoreGraphView(mount);
			}
		}
	}

	private async restoreGraphView(mount: EmbeddedLeafMount): Promise<void> {
		const leaf = mount.leaf as PatchedLeaf;
		const restore = leaf.__corvidaeOrigSetViewState ?? leaf.setViewState.bind(leaf);

		this.redirecting = true;
		try {
			await restore.call(leaf, { type: "graph", state: {}, active: false }, {
				focus: false,
			});
		} finally {
			this.redirecting = false;
		}
	}

	private patchGraphLeaf(mount: EmbeddedLeafMount): void {
		const leaf = mount.leaf as PatchedLeaf;
		if (leaf[PATCH_MARKER]) return;
		leaf[PATCH_MARKER] = true;

		const originalOpenFile = leaf.openFile.bind(leaf);
		const originalSetViewState = leaf.setViewState.bind(leaf);
		leaf.__corvidaeOrigOpenFile = originalOpenFile;
		leaf.__corvidaeOrigSetViewState = originalSetViewState;

		leaf.openFile = async (file: TFile, openState?: OpenViewState) => {
			if (this.redirecting || leaf.view?.getViewType?.() !== "graph") {
				return originalOpenFile(file, openState);
			}
			await this.openInMainTab(file, false);
		};

		leaf.setViewState = async (viewState: ViewState, eState?: unknown) => {
			if (this.redirecting || viewState.type === "graph") {
				return originalSetViewState(viewState, eState);
			}

			const filePath =
				viewState.state &&
				typeof viewState.state === "object" &&
				"file" in viewState.state &&
				typeof viewState.state.file === "string"
					? viewState.state.file
					: null;

			if (filePath) {
				const file = this.plugin.app.vault.getFileByPath(filePath);
				if (file instanceof TFile) {
					await this.openInMainTab(file, false);
					return;
				}
			}

			return originalSetViewState(viewState, eState);
		};
	}

	private async mount(boxId: string, host: HTMLElement): Promise<void> {
		let mount = this.mounts.get(boxId);

		if (!mount) {
			mount = createEmbeddedLeaf(this.plugin.app.workspace, host);
			this.mounts.set(boxId, mount);

			await mount.leaf.setViewState({
				type: "graph",
				state: {},
				active: false,
			});
		} else {
			reattachEmbeddedLeaf(mount, host);
		}

		this.patchGraphLeaf(mount);

		await mount.leaf.loadIfDeferred();
		mount.leaf.onResize();
	}
}
