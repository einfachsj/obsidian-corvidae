import { App, WorkspaceLeaf, WorkspaceParent } from "obsidian";
import type CorvidaePlugin from "../main";
import {
	CORVIDAE_DASHBOARD_VIEW,
	CorvidaeDashboardView,
	type CorvidaeDashboardState,
} from "./view";

const SYNC_DEBOUNCE_MS = 50;
export const DASHBOARD_BAR_HEIGHT_PX = 250;

export class DashboardLayoutManager {
	private syncTimer: number | null = null;
	private layoutSyncInProgress = false;
	private cachedContentLeaf: WorkspaceLeaf | null = null;
	private barSuppressedByUser = true;

	constructor(
		private app: App,
		private plugin: CorvidaePlugin
	) {}

	isBarOpen(): boolean {
		return this.findBarLeavesInMain().length > 0;
	}

	hasContentOpen(): boolean {
		return this.findMainContentLeaf() !== null;
	}

	async toggleBar(): Promise<void> {
		if (this.isBarOpen()) {
			this.barSuppressedByUser = true;
			for (const leaf of this.findBarLeavesInMain()) {
				leaf.detach();
			}
			this.cleanupBarSplitClasses();
		} else {
			this.barSuppressedByUser = false;
			const contentLeaf = this.findMainContentLeaf();
			if (contentLeaf) {
				await this.ensureSplitWithBar(contentLeaf);
			}
		}

		this.plugin.dashboardCrowControl?.updateButtonState();
	}

	scheduleSync(): void {
		if (!this.plugin.settings.dashboardAutoOpen) return;

		if (this.syncTimer !== null) {
			window.clearTimeout(this.syncTimer);
		}

		this.syncTimer = window.setTimeout(() => {
			this.syncTimer = null;
			void this.syncLayout();
		}, SYNC_DEBOUNCE_MS);
	}

	getContentLeaf(): WorkspaceLeaf | null {
		if (
			this.cachedContentLeaf &&
			this.isContentLeaf(this.cachedContentLeaf) &&
			this.isMainAreaLeaf(this.cachedContentLeaf)
		) {
			return this.cachedContentLeaf;
		}

		const found = this.findMainContentLeaf();
		this.cachedContentLeaf = found;
		return found;
	}

	async syncLayout(): Promise<void> {
		if (!this.plugin.settings.dashboardAutoOpen) return;
		if (this.layoutSyncInProgress) return;

		this.layoutSyncInProgress = true;
		try {
			const contentLeaf = this.findMainContentLeaf();

			if (contentLeaf) {
				this.cachedContentLeaf = contentLeaf;
				if (this.barSuppressedByUser) {
					for (const leaf of this.findBarLeavesInMain()) {
						leaf.detach();
					}
					this.cleanupBarSplitClasses();
				} else {
					await this.ensureSplitWithBar(contentLeaf);
					const barLeaf = this.findBarLeafForContent(contentLeaf);
					if (barLeaf) {
						this.applyBarSplitDimensions(barLeaf);
					}
				}
				this.plugin.dashboardCrowControl?.updateButtonState();
				return;
			}

			this.cachedContentLeaf = null;
			await this.collapseToFull();
			this.plugin.dashboardCrowControl?.updateButtonState();
		} finally {
			this.layoutSyncInProgress = false;
			this.syncTabStripChrome();
		}
	}

	syncTabStripChrome(): void {
		const tabGroups = document.querySelectorAll(".mod-root .workspace-tabs");
		for (let i = 0; i < tabGroups.length; i++) {
			const tabsEl = tabGroups.item(i);
			if (!tabsEl?.instanceOf(HTMLElement)) continue;
			if (tabsEl.classList.contains("corvidae-dashboard-bar-tabs")) continue;

			const hasFullDashboard =
				tabsEl.querySelector(".corvidae-dashboard-view--full") !== null;
			const hasOtherTabs =
				tabsEl.querySelector(
					'.workspace-tab-header:not([data-type="corvidae-dashboard"])'
				) !== null;

			tabsEl.toggleClass(
				"corvidae-hide-new-tab",
				hasFullDashboard && !hasOtherTabs
			);
		}

		this.cleanupBarSplitClasses();
	}

	/** Remove bar-split markers that no longer contain a bar tabs child. */
	cleanupBarSplitClasses(): void {
		document
			.querySelectorAll(".corvidae-dashboard-bar-split")
			.forEach((el) => {
				if (!el.instanceOf(HTMLElement)) return;
				if (el.querySelector(".corvidae-dashboard-bar-tabs")) return;
				el.removeClass("corvidae-dashboard-bar-split");
			});
	}

	private async collapseToFull(): Promise<void> {
		this.barSuppressedByUser = true;

		for (const leaf of this.findBarLeavesInMain()) {
			leaf.detach();
		}
		this.cleanupBarSplitClasses();

		this.dedupeFullDashboardsInMain();

		const targetLeaf = this.getMainTargetLeaf();
		if (!targetLeaf) return;

		const viewType = targetLeaf.view.getViewType();
		const state = targetLeaf.getViewState().state as CorvidaeDashboardState;

		if (viewType === "empty" || viewType === CORVIDAE_DASHBOARD_VIEW) {
			if (viewType !== CORVIDAE_DASHBOARD_VIEW || state?.mode !== "full") {
				await targetLeaf.setViewState({
					type: CORVIDAE_DASHBOARD_VIEW,
					state: { mode: "full" },
					active: true,
				});
			}
		}
	}

	private dedupeFullDashboardsInMain(): void {
		const fullLeaves = this.app.workspace
			.getLeavesOfType(CORVIDAE_DASHBOARD_VIEW)
			.filter((leaf) => {
				if (!this.isMainAreaLeaf(leaf)) return false;
				const state = leaf.getViewState().state as CorvidaeDashboardState;
				return state?.mode !== "bar";
			});

		if (fullLeaves.length <= 1) return;

		const recent = this.app.workspace.getMostRecentLeaf();
		const keep =
			fullLeaves.find((leaf) => leaf === recent) ?? fullLeaves[0];
		for (const leaf of fullLeaves) {
			if (leaf !== keep) {
				leaf.detach();
			}
		}
	}

	private async ensureSplitWithBar(contentLeaf: WorkspaceLeaf): Promise<void> {
		let barLeaf = this.findBarLeafForContent(contentLeaf);

		if (!barLeaf) {
			barLeaf = this.app.workspace.createLeafBySplit(
				contentLeaf,
				"horizontal",
				false
			);
			await barLeaf.setViewState({
				type: CORVIDAE_DASHBOARD_VIEW,
				state: { mode: "bar" },
				active: false,
			});
		} else {
			const state = barLeaf.getViewState().state as CorvidaeDashboardState;
			if (state?.mode !== "bar") {
				await barLeaf.setViewState({
					type: CORVIDAE_DASHBOARD_VIEW,
					state: { mode: "bar" },
					active: false,
				});
			}
		}

		this.removeStrayFullDashboardsInMain(contentLeaf, barLeaf);
		this.applyBarSplitDimensions(barLeaf);
		window.requestAnimationFrame(() => {
			this.applyBarSplitDimensions(barLeaf);
		});
	}

	private applyBarSplitDimensions(barLeaf: WorkspaceLeaf): void {
		const split = this.findHorizontalSplitAncestor(barLeaf);
		if (!split) return;

		const children = (split as { children?: WorkspaceParent[] }).children;
		if (!children || children.length !== 2) return;

		const splitEl = barLeaf.view.containerEl.closest(
			".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split"
		);
		const totalHeight = splitEl?.clientHeight ?? 0;
		if (totalHeight <= DASHBOARD_BAR_HEIGHT_PX) return;

		const barPercent = (DASHBOARD_BAR_HEIGHT_PX / totalHeight) * 100;
		const topPercent = 100 - barPercent;

		(children[0] as { dimension?: number }).dimension = topPercent;
		(children[1] as { dimension?: number }).dimension = barPercent;
	}

	private removeStrayFullDashboardsInMain(
		contentLeaf: WorkspaceLeaf,
		barLeaf: WorkspaceLeaf
	): void {
		for (const leaf of this.app.workspace.getLeavesOfType(
			CORVIDAE_DASHBOARD_VIEW
		)) {
			if (leaf === barLeaf) continue;
			if (!this.isMainAreaLeaf(leaf)) continue;

			const state = leaf.getViewState().state as CorvidaeDashboardState;
			if (state?.mode === "bar") continue;
			if (leaf === contentLeaf) continue;

			leaf.detach();
		}
	}

	private findMainContentLeaf(): WorkspaceLeaf | null {
		const recent = this.app.workspace.getMostRecentLeaf();
		if (recent && this.isMainAreaLeaf(recent) && this.isContentLeaf(recent)) {
			return recent;
		}

		let found: WorkspaceLeaf | null = null;
		this.app.workspace.iterateRootLeaves((leaf) => {
			if (!this.isMainAreaLeaf(leaf)) return;
			if (!this.isContentLeaf(leaf)) return;
			found = leaf;
		});
		return found;
	}

	private findBarLeavesInMain(): WorkspaceLeaf[] {
		return this.app.workspace
			.getLeavesOfType(CORVIDAE_DASHBOARD_VIEW)
			.filter((leaf) => {
				if (!this.isMainAreaLeaf(leaf)) return false;
				const state = leaf.getViewState().state as CorvidaeDashboardState;
				return state?.mode === "bar";
			});
	}

	private findBarLeafForContent(contentLeaf: WorkspaceLeaf): WorkspaceLeaf | null {
		const split = this.findHorizontalSplitAncestor(contentLeaf);
		if (!split) {
			return this.findBarLeavesInMain()[0] ?? null;
		}

		for (const leaf of this.findBarLeavesInMain()) {
			if (this.shareHorizontalSplit(contentLeaf, leaf)) {
				return leaf;
			}
		}

		return null;
	}

	private shareHorizontalSplit(a: WorkspaceLeaf, b: WorkspaceLeaf): boolean {
		const splitA = this.findHorizontalSplitAncestor(a);
		const splitB = this.findHorizontalSplitAncestor(b);
		return splitA !== null && splitA === splitB;
	}

	private findHorizontalSplitAncestor(
		leaf: WorkspaceLeaf
	): WorkspaceParent | null {
		let current: WorkspaceParent | null = leaf.parent;
		while (current) {
			if (
				"direction" in current &&
				(current as { direction?: string }).direction === "horizontal"
			) {
				return current;
			}
			current = current.parent;
		}
		return null;
	}

	private getMainTargetLeaf(): WorkspaceLeaf | null {
		const recent = this.app.workspace.getMostRecentLeaf();
		if (recent && this.isMainAreaLeaf(recent)) {
			return recent;
		}

		let found: WorkspaceLeaf | null = null;
		this.app.workspace.iterateRootLeaves((leaf) => {
			if (!this.isMainAreaLeaf(leaf)) return;
			found = leaf;
		});
		return found;
	}

	private isContentLeaf(leaf: WorkspaceLeaf): boolean {
		const viewType = leaf.view.getViewType();
		if (viewType === "empty") return false;
		if (viewType === CORVIDAE_DASHBOARD_VIEW) return false;
		return true;
	}

	isMainAreaLeaf(leaf: WorkspaceLeaf): boolean {
		const { leftSplit, rightSplit, rootSplit } = this.app.workspace;
		let current: WorkspaceParent | null = leaf.parent;

		while (current && current !== rootSplit) {
			if (current === leftSplit || current === rightSplit) {
				return false;
			}
			current = current.parent;
		}

		return current === rootSplit;
	}

	isBarDashboardLeaf(leaf: WorkspaceLeaf): boolean {
		if (leaf.view.getViewType() !== CORVIDAE_DASHBOARD_VIEW) return false;
		const view = leaf.view;
		if (view instanceof CorvidaeDashboardView) {
			return view.isBarMode();
		}
		const state = leaf.getViewState().state as CorvidaeDashboardState;
		return state?.mode === "bar";
	}
}
