import {
	ItemView,
	Menu,
	Notice,
	ViewStateResult,
	WorkspaceLeaf,
} from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import type { CorvidaeSettings } from "../settings";
import {
	getBarBoxWidthPx,
	DASHBOARD_GRID_COLUMNS,
	DASHBOARD_GRID_GAP_PX,
	DASHBOARD_GRID_ROW_HEIGHT_PX,
	MAX_BOX_ROWS,
	MIN_BOX_SIZE,
	type DashboardBox,
} from "./box-types";
import { BoxModal } from "./box-modal";
import {
	buildWebViewerViewState,
	isWebViewerEnabled,
	normalizeBrowserUrl,
} from "./browser-integration";
import {
	buildTerminalViewState,
	resolveDefaultTerminalProfile,
} from "./terminal-integration";

export const CORVIDAE_DASHBOARD_VIEW = "corvidae-dashboard";
export const CORVIDAE_PLUGIN_URL = "https://plugin.corvidae.app";

export interface CorvidaeDashboardState {
	mode?: "full" | "bar";
}

export class CorvidaeDashboardView extends ItemView {
	private getSettings: () => CorvidaeSettings;
	private plugin: CorvidaePlugin;
	private dashboardEl!: HTMLElement;
	private mode: "full" | "bar" = "full";
	private selectedBoxId: string | null = null;
	private moveMode = false;

	constructor(
		leaf: WorkspaceLeaf,
		plugin: CorvidaePlugin,
		getSettings: () => CorvidaeSettings
	) {
		super(leaf);
		this.plugin = plugin;
		this.getSettings = getSettings;
	}

	getViewType(): string {
		return CORVIDAE_DASHBOARD_VIEW;
	}

	getDisplayText(): string {
		return t("dashboard.viewTitle");
	}

	getIcon(): string {
		return "layout-dashboard";
	}

	getState(): Record<string, unknown> {
		return {
			mode: this.mode,
		};
	}

	async setState(
		state: Record<string, unknown>,
		_result: ViewStateResult
	): Promise<void> {
		const dashboardState = state as CorvidaeDashboardState;
		this.mode = dashboardState?.mode === "bar" ? "bar" : "full";
		this.applyModeClasses();
		this.render();
	}

	async onOpen(): Promise<void> {
		const saved = this.leaf.getViewState().state as
			| CorvidaeDashboardState
			| undefined;
		this.mode = saved?.mode === "bar" ? "bar" : "full";

		const { containerEl } = this;
		containerEl.empty();
		containerEl.addClass("corvidae-dashboard-view");
		this.applyModeClasses();

		this.dashboardEl = containerEl.createDiv({ cls: "corvidae-dashboard" });
		this.registerDomEvent(
			this.dashboardEl,
			"contextmenu",
			(evt) => {
				if ((evt.target as HTMLElement).closest(".corvidae-dashboard-toolbar")) {
					return;
				}
				evt.preventDefault();
				this.showDashboardMenu(evt);
			}
		);
		this.render();
	}

	async onClose(): Promise<void> {
		this.selectedBoxId = null;
		this.moveMode = false;
		this.plugin.dashboardGraphBoxEmbed.detachAll();
		this.plugin.dashboardNoteBoxEmbed.detachAll();
		this.plugin.dashboardTerminalBoxEmbed.detachAll();
		this.plugin.dashboardTicketBoxEmbed.detachAll();
		const tabsEl = this.containerEl.closest(".workspace-tabs");
		tabsEl?.removeClass("corvidae-dashboard-bar-tabs");
		tabsEl
			?.closest(
				".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split"
			)
			?.removeClass("corvidae-dashboard-bar-split");
		this.plugin.dashboardLayoutManager.cleanupBarSplitClasses();
		this.dashboardEl?.empty();
	}

	refresh(): void {
		this.pruneSelection();
		this.render();
	}

	isBarMode(): boolean {
		return this.mode === "bar";
	}

	private pruneSelection(): void {
		if (!this.selectedBoxId) return;
		if (!this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId)) {
			this.selectedBoxId = null;
			this.moveMode = false;
		}
	}

	private selectBox(boxId: string): void {
		if (this.selectedBoxId === boxId) {
			this.selectedBoxId = null;
		} else {
			this.selectedBoxId = boxId;
		}
		this.syncSelectionUi();
	}

	private syncSelectionUi(): void {
		if (!this.dashboardEl || this.mode !== "full") return;

		this.dashboardEl
			.querySelectorAll<HTMLElement>(".corvidae-dashboard-box")
			.forEach((el) => {
				el.classList.toggle("is-selected", el.dataset.boxId === this.selectedBoxId);
			});

		this.syncMoveSlots();
	}

	private syncMoveSlots(): void {
		const grid = this.dashboardEl.querySelector(".corvidae-dashboard-box-grid");
		if (!grid?.instanceOf(HTMLElement)) return;

		grid.querySelectorAll(".corvidae-dashboard-move-slot").forEach((slot) => {
			slot.remove();
		});

		if (this.moveMode && this.selectedBoxId) {
			this.renderMoveSlots(grid, this.selectedBoxId);
		}
	}

	private applyModeClasses(): void {
		this.containerEl.toggleClass(
			"corvidae-dashboard-view--full",
			this.mode === "full"
		);
		this.containerEl.toggleClass(
			"corvidae-dashboard-view--bar",
			this.mode === "bar"
		);
		this.applyBarTabChrome();
		this.plugin.dashboardLayoutManager.syncTabStripChrome();
	}

	private applyBarTabChrome(): void {
		const tabsEl = this.containerEl.closest(".workspace-tabs");
		if (!tabsEl?.instanceOf(HTMLElement)) return;

		const isBar = this.mode === "bar";
		tabsEl.toggleClass("corvidae-dashboard-bar-tabs", isBar);

		const splitEl = tabsEl.closest(
			".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split"
		);
		if (splitEl?.instanceOf(HTMLElement)) {
			splitEl.toggleClass("corvidae-dashboard-bar-split", isBar);
		}

		this.plugin.dashboardLayoutManager.cleanupBarSplitClasses();
	}

	private render(): void {
		if (!this.dashboardEl) return;

		this.dashboardEl.empty();

		if (this.mode === "bar") {
			this.renderBarMode();
			return;
		}

		this.renderToolbar(this.dashboardEl);
		this.renderBoxGrid(this.dashboardEl);
	}

	private renderBarMode(): void {
		const scroll = this.dashboardEl.createDiv({
			cls: "corvidae-dashboard-bar-scroll",
		});
		const track = scroll.createDiv({
			cls: "corvidae-dashboard-bar-track",
		});

		const boxes = this.plugin.dashboardBoxStore.getBoxes();
		if (boxes.length === 0) {
			track.createDiv({
				cls: "corvidae-dashboard-bar-empty",
				text: t("dashboard.box.emptyHint"),
			});
			return;
		}

		const sorted = [...boxes].sort(
			(a, b) => a.row - b.row || a.col - b.col || a.title.localeCompare(b.title)
		);
		for (const box of sorted) {
			this.renderBarBox(track, box);
		}

		this.syncGraphBoxes(boxes);
		this.syncNoteBoxes(boxes);
		this.syncBrowserBoxes(boxes);
		this.syncTerminalBoxes(boxes);
		this.syncTicketBoxes(boxes);
		window.requestAnimationFrame(() => {
			this.resyncGraphEmbeds();
			this.resyncNoteEmbeds();
			this.resyncBrowserEmbeds();
			this.resyncTerminalEmbeds();
			this.resyncTicketEmbeds();
		});
	}

	private renderBarBox(parent: HTMLElement, box: DashboardBox): void {
		const el = parent.createDiv({
			cls: "corvidae-dashboard-box corvidae-dashboard-box--bar",
		});
		const width = getBarBoxWidthPx(box.cols);
		el.style.width = `${width}px`;
		el.style.minWidth = `${width}px`;
		el.style.maxWidth = `${width}px`;
		el.style.flex = `0 0 ${width}px`;
		el.dataset.boxId = box.id;
		el.dataset.barCols = String(Math.max(2, box.cols));

		const titleBtn = el.createEl("button", {
			cls: "corvidae-dashboard-box-title",
			text: box.title,
		});
		titleBtn.type = "button";
		titleBtn.addEventListener("click", (evt) => {
			evt.stopPropagation();
			void this.openBoxInTab(box);
		});

		const body = el.createDiv({ cls: "corvidae-dashboard-box-body" });
		if (box.type === "graph") {
			body.addClass("corvidae-dashboard-box-body--graph");
			const host = body.createDiv({ cls: "corvidae-box-graph-host" });
			host.dataset.graphHost = box.id;
		} else if (box.type === "note") {
			body.addClass("corvidae-dashboard-box-body--note");
			const host = body.createDiv({ cls: "corvidae-box-note-host" });
			host.dataset.noteHost = box.id;
		} else if (box.type === "browser") {
			body.addClass("corvidae-dashboard-box-body--browser");
			const host = body.createDiv({ cls: "corvidae-box-browser-host" });
			host.dataset.browserHost = box.id;
		} else if (box.type === "terminal") {
			body.addClass("corvidae-dashboard-box-body--terminal");
			const host = body.createDiv({ cls: "corvidae-box-terminal-host" });
			host.dataset.terminalHost = box.id;
		} else if (box.type === "ticket") {
			body.addClass("corvidae-dashboard-box-body--ticket");
			const host = body.createDiv({ cls: "corvidae-box-ticket-host" });
			host.dataset.ticketHost = box.id;
		}
	}

	private renderToolbar(parent: HTMLElement): void {
		const toolbar = parent.createDiv({
			cls: "corvidae-dashboard-toolbar",
		});

		toolbar.createEl("h1", {
			cls: "corvidae-dashboard-title",
			text: t("dashboard.title"),
		});

		const actions = toolbar.createDiv({ cls: "corvidae-dashboard-toolbar-actions" });
		const crowLink = actions.createSpan({
			cls: "corvidae-dashboard-crow-link",
			text: "🐦‍⬛",
		});
		crowLink.setAttribute("role", "link");
		crowLink.setAttribute("tabindex", "0");
		crowLink.setAttribute("aria-label", t("dashboard.crow.link"));
		const openCrowLink = (): void => {
			window.open(CORVIDAE_PLUGIN_URL);
		};
		crowLink.addEventListener("click", openCrowLink);
		crowLink.addEventListener("keydown", (evt) => {
			if (evt.key === "Enter" || evt.key === " ") {
				evt.preventDefault();
				openCrowLink();
			}
		});
	}

	private showDashboardMenu(evt: MouseEvent): void {
		const hasBoxes = this.plugin.dashboardBoxStore.getBoxes().length > 0;
		const hasSelection = this.selectedBoxId !== null;

		const menu = new Menu();

		menu.addItem((item) => {
			item.setTitle(t("dashboard.box.create")).onClick(() => {
				new BoxModal(this.app, this.plugin).open();
			});
		});

		menu.addItem((item) => {
			item.setTitle(t("dashboard.box.move"));
			if (!hasBoxes) {
				item.setDisabled(true);
			}
			item.onClick(() => {
				if (!hasBoxes) return;
				this.moveMode = !this.moveMode;
				this.render();
			});
		});

		menu.addItem((item) => {
			item.setTitle(t("dashboard.box.edit"));
			if (!hasSelection) {
				item.setDisabled(true);
			}
			item.onClick(() => {
				if (!this.selectedBoxId) return;
				const box = this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId);
				if (!box) return;
				new BoxModal(this.app, this.plugin, box).open();
			});
		});

		const selectedBox = this.selectedBoxId
			? this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId)
			: null;
		const canOpenTab = selectedBox
			? this.canOpenBoxInTab(selectedBox)
			: false;

		menu.addItem((item) => {
			item.setTitle(t("dashboard.box.openTab"));
			if (!canOpenTab) {
				item.setDisabled(true);
			}
			item.onClick(() => {
				void this.openSelectedBoxInTab();
			});
		});

		menu.showAtMouseEvent(evt);
	}

	private canOpenBoxInTab(box: DashboardBox): boolean {
		if (box.type === "graph") return true;
		if (box.type === "note") {
			return Boolean(box.notePath && this.app.vault.getFileByPath(box.notePath));
		}
		if (box.type === "browser") {
			return (
				isWebViewerEnabled(this.app) &&
				Boolean(normalizeBrowserUrl(box.link ?? ""))
			);
		}
		if (box.type === "terminal") {
			return resolveDefaultTerminalProfile(this.app) !== null;
		}
		if (box.type === "ticket") {
			const projectId = box.ticketProjectId;
			if (!projectId) return false;
			const logPath =
				this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(projectId);
			return Boolean(logPath && this.app.vault.getFileByPath(logPath));
		}
		return false;
	}

	private async openSelectedBoxInTab(): Promise<void> {
		if (!this.selectedBoxId) return;

		const box = this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId);
		if (!box || !this.canOpenBoxInTab(box)) return;

		if (box.type === "note" && box.notePath) {
			await this.app.workspace.openLinkText(box.notePath, "", false, {
				active: true,
			});
			return;
		}

		if (box.type === "graph") {
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState({ type: "graph", state: {}, active: true });
			return;
		}

		if (box.type === "browser" && box.link) {
			const url = normalizeBrowserUrl(box.link);
			if (!url || !isWebViewerEnabled(this.app)) return;
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState(
				{ ...buildWebViewerViewState(url), active: true },
				{ focus: true }
			);
			return;
		}

		if (box.type === "terminal") {
			const resolved = resolveDefaultTerminalProfile(this.app);
			if (!resolved) return;
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState(
				{
					...buildTerminalViewState(
						resolved.profileSourceId,
						resolved.profile,
						box.title
					),
					active: true,
				},
				{ focus: true }
			);
			return;
		}

		if (box.type === "ticket" && box.ticketProjectId) {
			const logPath =
				this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(
					box.ticketProjectId
				);
			if (!logPath) return;
			await this.app.workspace.openLinkText(logPath, "", false, {
				active: true,
			});
		}
	}

	private renderBoxGrid(parent: HTMLElement): void {
		const boxes = this.plugin.dashboardBoxStore.getBoxes();
		const grid = parent.createDiv({ cls: "corvidae-dashboard-box-grid" });

		if (this.moveMode) {
			grid.addClass("is-move-mode");
		}

		if (boxes.length === 0) {
			grid.createDiv({
				cls: "corvidae-dashboard-box-empty",
				text: t("dashboard.box.emptyHint"),
			});
			return;
		}

		if (this.moveMode && this.selectedBoxId) {
			this.renderMoveSlots(grid, this.selectedBoxId);
		}

		for (const box of boxes) {
			this.renderBox(grid, box);
		}

		this.syncGraphBoxes(boxes);
		this.syncNoteBoxes(boxes);
		this.syncBrowserBoxes(boxes);
		this.syncTerminalBoxes(boxes);
		this.syncTicketBoxes(boxes);
		window.requestAnimationFrame(() => {
			this.resyncGraphEmbeds();
			this.resyncNoteEmbeds();
			this.resyncBrowserEmbeds();
			this.resyncTerminalEmbeds();
			this.resyncTicketEmbeds();
		});
	}

	previewBrowserBoxLink(boxId: string, link: string): void {
		void this.plugin.dashboardBrowserBoxEmbed.navigateLink(
			boxId,
			link,
			(id) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-browser-host="${id}"]`
				)
		);
	}

	resyncGraphEmbeds(): void {
		this.syncGraphBoxes(this.plugin.dashboardBoxStore.getBoxes());
	}

	resyncNoteEmbeds(): void {
		this.syncNoteBoxes(this.plugin.dashboardBoxStore.getBoxes());
	}

	resyncBrowserEmbeds(): void {
		this.syncBrowserBoxes(this.plugin.dashboardBoxStore.getBoxes());
	}

	resyncTerminalEmbeds(): void {
		this.syncTerminalBoxes(this.plugin.dashboardBoxStore.getBoxes());
	}

	resyncTicketEmbeds(): void {
		this.syncTicketBoxes(this.plugin.dashboardBoxStore.getBoxes());
	}

	private syncNoteBoxes(boxes: DashboardBox[]): void {
		const noteBoxes = boxes.filter((box) => box.type === "note");
		if (noteBoxes.length === 0) return;

		this.plugin.dashboardNoteBoxEmbed.scheduleSync(
			noteBoxes,
			(boxId) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-note-host="${boxId}"]`
				)
		);
	}

	private syncGraphBoxes(boxes: DashboardBox[]): void {
		const graphBoxes = boxes.filter((box) => box.type === "graph");
		if (graphBoxes.length === 0) return;

		this.plugin.dashboardGraphBoxEmbed.scheduleSync(
			graphBoxes,
			(boxId) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-graph-host="${boxId}"]`
				)
		);
	}

	private syncBrowserBoxes(boxes: DashboardBox[]): void {
		const browserBoxes = boxes.filter((box) => box.type === "browser");
		if (browserBoxes.length === 0) return;

		this.plugin.dashboardBrowserBoxEmbed.scheduleSync(
			browserBoxes,
			(boxId) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-browser-host="${boxId}"]`
				)
		);
	}

	private syncTerminalBoxes(boxes: DashboardBox[]): void {
		const terminalBoxes = boxes.filter((box) => box.type === "terminal");
		if (terminalBoxes.length === 0) return;

		this.plugin.dashboardTerminalBoxEmbed.scheduleSync(
			terminalBoxes,
			(boxId) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-terminal-host="${boxId}"]`
				)
		);
	}

	private syncTicketBoxes(boxes: DashboardBox[]): void {
		const ticketBoxes = boxes.filter((box) => box.type === "ticket");
		if (ticketBoxes.length === 0) return;

		this.plugin.dashboardTicketBoxEmbed.scheduleSync(
			ticketBoxes,
			(boxId) =>
				this.dashboardEl.querySelector<HTMLElement>(
					`[data-ticket-host="${boxId}"]`
				)
		);
	}

	private renderMoveSlots(grid: HTMLElement, boxId: string): void {
		const positions = this.plugin.dashboardBoxStore.findValidMovePositions(boxId);
		const selected = this.plugin.dashboardBoxStore.getBoxById(boxId);
		if (!selected) return;

		for (const position of positions) {
			const isCurrent =
				position.col === selected.col && position.row === selected.row;
			const slot = grid.createDiv({
				cls: "corvidae-dashboard-move-slot",
			});
			if (isCurrent) {
				slot.addClass("is-current");
			}
			slot.style.gridColumn = `${position.col + 1} / span ${selected.cols}`;
			slot.style.gridRow = `${position.row + 1} / span ${selected.rows}`;

			if (isCurrent) continue;

			slot.addEventListener("click", () => {
				void this.handleMoveTo(position.col, position.row);
			});
		}
	}

	private async handleMoveTo(col: number, row: number): Promise<void> {
		if (!this.selectedBoxId) return;

		const result = await this.plugin.dashboardBoxStore.moveBox(
			this.selectedBoxId,
			col,
			row
		);
		if (!result.ok) return;

		this.plugin.refreshDashboardViews();
	}

	private renderBox(parent: HTMLElement, box: DashboardBox): void {
		const el = parent.createDiv({ cls: "corvidae-dashboard-box" });
		el.style.gridColumn = `${box.col + 1} / span ${box.cols}`;
		el.style.gridRow = `${box.row + 1} / span ${box.rows}`;
		el.dataset.boxId = box.id;

		if (box.id === this.selectedBoxId) {
			el.addClass("is-selected");
		}
		if (this.moveMode) {
			el.addClass("is-move-target");
		}

		const titleBtn = el.createEl("button", {
			cls: "corvidae-dashboard-box-title",
			text: box.title,
		});
		titleBtn.type = "button";
		titleBtn.addEventListener("click", (evt) => {
			evt.stopPropagation();
			this.selectBox(box.id);
		});

		const body = el.createDiv({ cls: "corvidae-dashboard-box-body" });
		if (box.type === "graph") {
			body.addClass("corvidae-dashboard-box-body--graph");
			const host = body.createDiv({ cls: "corvidae-box-graph-host" });
			host.dataset.graphHost = box.id;
		} else if (box.type === "note") {
			body.addClass("corvidae-dashboard-box-body--note");
			const host = body.createDiv({ cls: "corvidae-box-note-host" });
			host.dataset.noteHost = box.id;
		} else if (box.type === "browser") {
			body.addClass("corvidae-dashboard-box-body--browser");
			const host = body.createDiv({ cls: "corvidae-box-browser-host" });
			host.dataset.browserHost = box.id;
		} else if (box.type === "terminal") {
			body.addClass("corvidae-dashboard-box-body--terminal");
			const host = body.createDiv({ cls: "corvidae-box-terminal-host" });
			host.dataset.terminalHost = box.id;
		} else if (box.type === "ticket") {
			body.addClass("corvidae-dashboard-box-body--ticket");
			const host = body.createDiv({ cls: "corvidae-box-ticket-host" });
			host.dataset.ticketHost = box.id;
		}

		if (this.moveMode) {
			this.attachResizeHandle(el, box, parent);
		}
	}

	private attachResizeHandle(
		boxEl: HTMLElement,
		box: DashboardBox,
		gridEl: HTMLElement
	): void {
		const handle = boxEl.createDiv({
			cls: "corvidae-dashboard-box-resize-handle",
		});
		handle.setAttribute("aria-label", t("dashboard.box.resizeHint"));

		let startX = 0;
		let startY = 0;
		let startCols = box.cols;
		let startRows = box.rows;
		let previewCols = box.cols;
		let previewRows = box.rows;

		const onMove = (evt: MouseEvent): void => {
			const metrics = this.getGridMetrics(gridEl);
			const deltaCols = Math.round((evt.clientX - startX) / metrics.stepX);
			const deltaRows = Math.round((evt.clientY - startY) / metrics.stepY);

			previewCols = Math.max(
				MIN_BOX_SIZE,
				Math.min(
					DASHBOARD_GRID_COLUMNS - box.col,
					startCols + deltaCols
				)
			);
			previewRows = Math.max(
				MIN_BOX_SIZE,
				Math.min(MAX_BOX_ROWS, startRows + deltaRows)
			);

			boxEl.style.gridColumn = `${box.col + 1} / span ${previewCols}`;
			boxEl.style.gridRow = `${box.row + 1} / span ${previewRows}`;
			boxEl.toggleClass(
				"is-resize-invalid",
				!this.plugin.dashboardBoxStore.canFitBoxSize(
					box.id,
					box.col,
					box.row,
					previewCols,
					previewRows
				)
			);
		};

		const onUp = (): void => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onUp);
			boxEl.removeClass("is-resizing");

			void (async () => {
				const canFit = this.plugin.dashboardBoxStore.canFitBoxSize(
					box.id,
					box.col,
					box.row,
					previewCols,
					previewRows
				);
				if (
					!canFit ||
					(previewCols === box.cols && previewRows === box.rows)
				) {
					this.render();
					return;
				}

				const result = await this.plugin.dashboardBoxStore.resizeBox(
					box.id,
					previewCols,
					previewRows
				);
				if (!result.ok) {
					new Notice(t("dashboard.box.error.noSpace"));
					this.render();
					return;
				}

				this.plugin.refreshDashboardViews();
			})();
		};

		handle.addEventListener("mousedown", (evt) => {
			evt.preventDefault();
			evt.stopPropagation();
			startX = evt.clientX;
			startY = evt.clientY;
			startCols = box.cols;
			startRows = box.rows;
			previewCols = box.cols;
			previewRows = box.rows;
			boxEl.addClass("is-resizing");
			document.addEventListener("mousemove", onMove);
			document.addEventListener("mouseup", onUp);
		});
	}

	private getGridMetrics(grid: HTMLElement): {
		stepX: number;
		stepY: number;
	} {
		const style = getComputedStyle(grid);
		const columnGap =
			parseFloat(style.columnGap || style.gap) || DASHBOARD_GRID_GAP_PX;
		const rowGap = parseFloat(style.rowGap || style.gap) || DASHBOARD_GRID_GAP_PX;
		const rect = grid.getBoundingClientRect();
		const cellWidth =
			(rect.width - columnGap * (DASHBOARD_GRID_COLUMNS - 1)) /
			DASHBOARD_GRID_COLUMNS;

		return {
			stepX: cellWidth + columnGap,
			stepY: DASHBOARD_GRID_ROW_HEIGHT_PX + rowGap,
		};
	}

	private async openBoxInTab(box: DashboardBox): Promise<void> {
		if (!this.canOpenBoxInTab(box)) return;

		if (box.type === "note" && box.notePath) {
			await this.app.workspace.openLinkText(box.notePath, "", false, {
				active: true,
			});
			return;
		}

		if (box.type === "graph") {
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState({ type: "graph", state: {}, active: true });
			return;
		}

		if (box.type === "browser" && box.link) {
			const url = normalizeBrowserUrl(box.link);
			if (!url || !isWebViewerEnabled(this.app)) return;
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState(
				{ ...buildWebViewerViewState(url), active: true },
				{ focus: true }
			);
			return;
		}

		if (box.type === "terminal") {
			const resolved = resolveDefaultTerminalProfile(this.app);
			if (!resolved) return;
			const leaf = this.app.workspace.getLeaf(false);
			await leaf.setViewState(
				{
					...buildTerminalViewState(
						resolved.profileSourceId,
						resolved.profile,
						box.title
					),
					active: true,
				},
				{ focus: true }
			);
			return;
		}

		if (box.type === "ticket" && box.ticketProjectId) {
			const logPath =
				this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(
					box.ticketProjectId
				);
			if (!logPath) return;
			await this.app.workspace.openLinkText(logPath, "", false, {
				active: true,
			});
		}
	}
}
