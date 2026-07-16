/**
 * CORVIDAE – Einstiegspunkt
 * Author: ein.ink
 */

import { Plugin, TAbstractFile, TFile, TFolder, WorkspaceLeaf } from "obsidian";
import {
	CORVIDAE_DASHBOARD_VIEW,
	CorvidaeDashboardView,
	DashboardBoxStore,
	DashboardLayoutManager,
	DashboardCrowControl,
	DashboardGraphBoxEmbed,
	DashboardNoteBoxEmbed,
	DashboardBrowserBoxEmbed,
	DashboardTerminalBoxEmbed,
	DashboardTicketBoxEmbed,
} from "./dashboard";
import { ExplorerManager } from "./explorer";
import { FolderNoteCreateUI, FolderNoteManager } from "./folder-note";
import { isRecord } from "./frontmatter/utils";
import { GraphPatcher, LegendManager } from "./graph";
import { HybridLinkManager } from "./hybrid-link";
import { initI18n, t } from "./i18n";
import { NoteBootstrap } from "./note-bootstrap";
import { registerCorvidaePropertyTypes } from "./properties";
import {
	CorvidaeSettingTab,
	DEFAULT_SETTINGS,
	type CorvidaeSettings,
} from "./settings";
import {
	activateTicketsSidebar,
	CORVIDAE_TICKETS_VIEW,
	CorvidaeTicketsView,
	TicketManager,
} from "./tickets";
import { ensureFilePropertiesSidebarOnFirstRun } from "./workspace";

export default class CorvidaePlugin extends Plugin {
	settings: CorvidaeSettings = { ...DEFAULT_SETTINGS };

	private folderNoteManager!: FolderNoteManager;
	private folderNoteCreateUI!: FolderNoteCreateUI;
	private hybridLinkManager!: HybridLinkManager;
	private explorerManager!: ExplorerManager;
	private graphPatcher!: GraphPatcher;
	private legendManager!: LegendManager;
	private noteBootstrap!: NoteBootstrap;
	ticketManager!: TicketManager;
	private patchIntervalId: number | null = null;
	dashboardLayoutManager!: DashboardLayoutManager;
	dashboardCrowControl!: DashboardCrowControl;
	dashboardGraphBoxEmbed!: DashboardGraphBoxEmbed;
	dashboardNoteBoxEmbed!: DashboardNoteBoxEmbed;
	dashboardBrowserBoxEmbed!: DashboardBrowserBoxEmbed;
	dashboardTerminalBoxEmbed!: DashboardTerminalBoxEmbed;
	dashboardTicketBoxEmbed!: DashboardTicketBoxEmbed;
	dashboardBoxStore!: DashboardBoxStore;

	async onload(): Promise<void> {
		this.dashboardBoxStore = new DashboardBoxStore(this);
		this.dashboardGraphBoxEmbed = new DashboardGraphBoxEmbed(this);
		this.dashboardNoteBoxEmbed = new DashboardNoteBoxEmbed(this);
		this.dashboardBrowserBoxEmbed = new DashboardBrowserBoxEmbed(this);
		this.dashboardTerminalBoxEmbed = new DashboardTerminalBoxEmbed(this);
		this.dashboardTicketBoxEmbed = new DashboardTicketBoxEmbed(this);
		this.dashboardGraphBoxEmbed.onload();
		this.dashboardTicketBoxEmbed.onload();
		await this.loadSettings();
		initI18n(() => this.settings.language);

		this.graphPatcher = new GraphPatcher(this.app, this.settings);
		this.legendManager = new LegendManager(this.settings);
		this.noteBootstrap = new NoteBootstrap(this.app, this.settings);
		this.ticketManager = new TicketManager(this.app, this.noteBootstrap);
		this.folderNoteManager = new FolderNoteManager(this.app, this.settings);
		this.hybridLinkManager = new HybridLinkManager(this.app, this.settings);
		this.folderNoteCreateUI = new FolderNoteCreateUI(this);
		this.folderNoteCreateUI.onload();
		this.explorerManager = new ExplorerManager(this.app, this, this.settings);
		this.explorerManager.onload();

		this.registerView(
			CORVIDAE_DASHBOARD_VIEW,
			(leaf) => new CorvidaeDashboardView(leaf, this, () => this.settings)
		);

		this.registerView(
			CORVIDAE_TICKETS_VIEW,
			(leaf) => new CorvidaeTicketsView(leaf, this)
		);

		this.dashboardLayoutManager = new DashboardLayoutManager(this.app, this);
		this.dashboardCrowControl = new DashboardCrowControl(this);
		this.dashboardCrowControl.onload();

		this.addCommand({
			id: "open-dashboard",
			name: t("dashboard.viewTitle"),
			callback: () => {
				void this.activateDashboard();
			},
		});

		this.addCommand({
			id: "open-tickets-sidebar",
			name: t("tickets.command"),
			callback: () => {
				void activateTicketsSidebar(this.app);
			},
		});

		this.addRibbonIcon("list-checks", t("tickets.command"), () => {
			void activateTicketsSidebar(this.app);
		});

		this.registerCorvidaePropertyTypes();
		this.addSettingTab(new CorvidaeSettingTab(this.app, this));
		void ensureFilePropertiesSidebarOnFirstRun(
			this.app,
			() => this.settings.filePropertiesSidebarInitialized,
			async () => {
				this.settings.filePropertiesSidebarInitialized = true;
				await this.saveSettings();
			}
		);

		this.app.workspace.onLayoutReady(() => {
			if (this.settings.ticketsSidebarAutoOpen) {
				void activateTicketsSidebar(this.app);
			}
		});
		this.setupGraphHooks();

		this.registerEvent(
			this.app.metadataCache.on("changed", (file) => {
				this.refreshGraphFeatures();
				this.refreshDashboardBarViews();
				if (file instanceof TFile) {
					this.hybridLinkManager.scheduleSyncForMetadataChange(file);
				}
			})
		);

		this.registerEvent(
			this.app.vault.on("create", (file: TAbstractFile) => {
				if (file instanceof TFile) {
					void this.handleFileCreated(file);
				} else if (file instanceof TFolder) {
					this.hybridLinkManager.scheduleSyncForParentOf(file);
				}
				this.refreshDashboardBarViews();
				this.dashboardLayoutManager.scheduleSync();
			})
		);

		this.registerEvent(
			this.app.vault.on("delete", (file: TAbstractFile) => {
				this.hybridLinkManager.scheduleSyncForParentOf(file);
				this.refreshDashboardBarViews();
				this.dashboardLayoutManager.scheduleSync();
			})
		);

		this.registerEvent(
			this.app.vault.on("rename", (file: TAbstractFile, oldPath: string) => {
				if (file instanceof TFile) {
					void this.folderNoteManager.onNoteRename(file, oldPath).catch(() => {});
					this.hybridLinkManager.scheduleSyncForRename(file, oldPath);
					return;
				}
				if (file instanceof TFolder) {
					void this.folderNoteManager.onFolderRename(file, oldPath).catch(() => {});
					this.hybridLinkManager.scheduleSyncForRename(file, oldPath);
				}
				this.refreshDashboardBarViews();
				this.dashboardLayoutManager.scheduleSync();
			})
		);

		this.app.workspace.onLayoutReady(() => {
			this.dashboardLayoutManager.scheduleSync();
		});

		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				this.dashboardLayoutManager.scheduleSync();
				this.resyncDashboardGraphEmbeds();
				this.resyncDashboardNoteEmbeds();
				this.resyncDashboardTicketEmbeds();
			})
		);

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.dashboardLayoutManager.scheduleSync();
			})
		);
	}

	private async handleFileCreated(file: TFile): Promise<void> {
		if (file.extension === "md") {
			await this.noteBootstrap.onFileCreated(file);
		}
		this.hybridLinkManager.scheduleSyncForParentOf(file);
	}

	async createFolderNote(parent: TFolder | null): Promise<TFile | null> {
		const note = await this.folderNoteManager.createFolderNote(parent);
		if (!note) return null;

		await this.noteBootstrap.onFileCreated(note);
		this.hybridLinkManager.scheduleSyncForParentOf(note);
		await this.app.workspace.openLinkText(note.path, "", false, { active: true });
		return note;
	}

	onunload(): void {
		this.folderNoteCreateUI.onunload();
		this.explorerManager.onunload();
		this.dashboardGraphBoxEmbed.onunload();
		this.dashboardCrowControl.onunload();
		this.dashboardGraphBoxEmbed.detachAll();
		this.dashboardNoteBoxEmbed.detachAll();
		this.dashboardBrowserBoxEmbed.detachAll();
		this.dashboardTerminalBoxEmbed.detachAll();
		this.dashboardTicketBoxEmbed.detachAll();
		this.legendManager.removeAll(this.getGraphLeaves());
		this.stopPatchInterval();
	}

	onLanguageChanged(): void {
		this.folderNoteCreateUI.refreshUi();
		this.explorerManager.scheduleFolderRefresh();
		this.registerCorvidaePropertyTypes();
		this.refreshGraphFeatures();
		this.refreshDashboardViews();
		this.refreshTicketsViews();
	}

	registerCorvidaePropertyTypes(): void {
		registerCorvidaePropertyTypes(this.app, this.settings);
	}

	private setupGraphHooks(): void {
		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				this.refreshGraphFeatures();
			})
		);

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.refreshGraphFeatures();
			})
		);

		this.startPatchInterval();
		this.register(() => this.stopPatchInterval());
	}

	private startPatchInterval(): void {
		this.stopPatchInterval();
		this.patchIntervalId = window.setInterval(() => {
			this.refreshGraphFeatures();
		}, this.settings.patchIntervalMs);
	}

	private stopPatchInterval(): void {
		if (this.patchIntervalId !== null) {
			window.clearInterval(this.patchIntervalId);
			this.patchIntervalId = null;
		}
	}

	restartPatchInterval(): void {
		this.startPatchInterval();
	}

	refreshGraphFeatures(): void {
		const leaves = this.getGraphLeaves();
		if (leaves.length === 0) return;

		this.graphPatcher.patchAllGraphs(leaves);
		const entries = this.graphPatcher.collectLegendEntries(leaves);
		this.legendManager.syncLegends(leaves, entries);
	}

	refreshDashboardViews(): void {
		for (const view of this.getDashboardViews()) {
			view.refresh();
		}
	}

	refreshDashboardBarViews(): void {
		for (const view of this.getDashboardViews()) {
			if (view.isBarMode()) {
				view.refresh();
			}
		}
	}

	private getDashboardViews(): CorvidaeDashboardView[] {
		const views: CorvidaeDashboardView[] = [];
		for (const leaf of this.app.workspace.getLeavesOfType(
			CORVIDAE_DASHBOARD_VIEW
		)) {
			if (leaf.view instanceof CorvidaeDashboardView) {
				views.push(leaf.view);
			}
		}
		return views;
	}

	private resyncDashboardGraphEmbeds(): void {
		for (const view of this.getDashboardViews()) {
			view.resyncGraphEmbeds();
		}
	}

	private resyncDashboardNoteEmbeds(): void {
		for (const view of this.getDashboardViews()) {
			view.resyncNoteEmbeds();
		}
	}

	resyncDashboardBrowserEmbeds(): void {
		for (const view of this.getDashboardViews()) {
			view.resyncBrowserEmbeds();
		}
	}

	resyncDashboardTicketEmbeds(): void {
		for (const view of this.getDashboardViews()) {
			view.resyncTicketEmbeds();
		}
	}

	previewBrowserBoxLink(boxId: string, link: string): void {
		for (const view of this.getDashboardViews()) {
			view.previewBrowserBoxLink(boxId, link);
		}
	}

	refreshTicketsViews(): void {
		for (const view of this.getTicketsViews()) {
			view.refresh();
		}
	}

	private getTicketsViews(): CorvidaeTicketsView[] {
		const views: CorvidaeTicketsView[] = [];
		for (const leaf of this.app.workspace.getLeavesOfType(CORVIDAE_TICKETS_VIEW)) {
			if (leaf.view instanceof CorvidaeTicketsView) {
				views.push(leaf.view);
			}
		}
		return views;
	}

	async activateDashboard(): Promise<void> {
		const existing = this.app.workspace.getLeavesOfType(CORVIDAE_DASHBOARD_VIEW);
		const fullDashboard = existing.find((leaf) => {
			const view = leaf.view;
			return view instanceof CorvidaeDashboardView && !view.isBarMode();
		});

		if (fullDashboard) {
			await this.app.workspace.revealLeaf(fullDashboard);
			return;
		}

		const leaf = this.app.workspace.getLeaf(false);
		await leaf.setViewState({
			type: CORVIDAE_DASHBOARD_VIEW,
			state: { mode: "full" },
			active: true,
		});
	}

	private getGraphLeaves(): WorkspaceLeaf[] {
		const leaves = this.app.workspace.getLeavesOfType("graph");
		const embedded = this.dashboardGraphBoxEmbed.getLeaves();
		const seen = new Set<WorkspaceLeaf>();
		const combined: WorkspaceLeaf[] = [];

		for (const leaf of [...leaves, ...embedded]) {
			if (seen.has(leaf)) continue;
			seen.add(leaf);
			combined.push(leaf);
		}

		return combined;
	}

	async saveSettings(): Promise<void> {
		const raw = (await this.loadData()) as unknown;
		const existing = isRecord(raw) ? raw : {};
		await this.saveData({
			...existing,
			...this.settings,
			dashboardBoxes: this.dashboardBoxStore.getBoxes(),
		});
		this.graphPatcher.updateSettings(this.settings);
		this.legendManager.updateSettings(this.settings);
		this.noteBootstrap.updateSettings(this.settings);
		this.folderNoteManager.updateSettings(this.settings);
		this.hybridLinkManager.updateSettings(this.settings);
		this.explorerManager.updateSettings(this.settings);
		this.ticketManager = new TicketManager(this.app, this.noteBootstrap);
		this.registerCorvidaePropertyTypes();
	}

	private async loadSettings(): Promise<void> {
		const data = (await this.loadData()) as unknown;
		const rawData = isRecord(data) ? data : {};
		const { dashboardBoxes: _dashboardBoxes, ...settingsData } = rawData;
		const hadExcludePrefixes = Array.isArray(
			settingsData.folderNoteExcludePrefixes
		);

		this.settings = { ...DEFAULT_SETTINGS };

		if (
			settingsData.language === "auto" ||
			settingsData.language === "en" ||
			settingsData.language === "de"
		) {
			this.settings.language = settingsData.language;
		}
		if (typeof settingsData.showLegend === "boolean") {
			this.settings.showLegend = settingsData.showLegend;
		}
		if (typeof settingsData.legendShowDefaultAndUncolored === "boolean") {
			this.settings.legendShowDefaultAndUncolored =
				settingsData.legendShowDefaultAndUncolored;
		}
		if (typeof settingsData.autoFrontmatter === "boolean") {
			this.settings.autoFrontmatter = settingsData.autoFrontmatter;
		}
		if (typeof settingsData.folderNoteEnabled === "boolean") {
			this.settings.folderNoteEnabled = settingsData.folderNoteEnabled;
		}
		if (typeof settingsData.folderNoteSyncRename === "boolean") {
			this.settings.folderNoteSyncRename = settingsData.folderNoteSyncRename;
		}
		if (typeof settingsData.folderNoteOpenOnClick === "boolean") {
			this.settings.folderNoteOpenOnClick = settingsData.folderNoteOpenOnClick;
		}
		if (typeof settingsData.folderNoteHideInExplorer === "boolean") {
			this.settings.folderNoteHideInExplorer =
				settingsData.folderNoteHideInExplorer;
		}
		if (typeof settingsData.dashboardAutoOpen === "boolean") {
			this.settings.dashboardAutoOpen = settingsData.dashboardAutoOpen;
		}
		if (typeof settingsData.filePropertiesSidebarInitialized === "boolean") {
			this.settings.filePropertiesSidebarInitialized =
				settingsData.filePropertiesSidebarInitialized;
		}
		if (typeof settingsData.sizeProperty === "string") {
			this.settings.sizeProperty = settingsData.sizeProperty;
		}
		if (typeof settingsData.colorProperty === "string") {
			this.settings.colorProperty = settingsData.colorProperty;
		}
		if (typeof settingsData.minSize === "number") {
			this.settings.minSize = settingsData.minSize;
		}
		if (typeof settingsData.maxSize === "number") {
			this.settings.maxSize = settingsData.maxSize;
		}
		if (typeof settingsData.defaultSize === "number") {
			this.settings.defaultSize = settingsData.defaultSize;
		}
		if (typeof settingsData.defaultColor === "string") {
			this.settings.defaultColor = settingsData.defaultColor;
		}
		if (typeof settingsData.patchIntervalMs === "number") {
			this.settings.patchIntervalMs = settingsData.patchIntervalMs;
		}
		if (typeof settingsData.ticketsSidebarAutoOpen === "boolean") {
			this.settings.ticketsSidebarAutoOpen = settingsData.ticketsSidebarAutoOpen;
		}

		if (Array.isArray(settingsData.defaultTags)) {
			this.settings.defaultTags = settingsData.defaultTags.filter(
				(tag): tag is string => typeof tag === "string"
			);
		}

		const configDir = this.app.vault.configDir;
		if (!hadExcludePrefixes) {
			this.settings.folderNoteExcludePrefixes = [configDir, ".trash"];
		} else if (Array.isArray(settingsData.folderNoteExcludePrefixes)) {
			this.settings.folderNoteExcludePrefixes =
				settingsData.folderNoteExcludePrefixes.filter(
					(p): p is string => typeof p === "string"
				);
		}

		if (!Array.isArray(settingsData.ticketProjects)) {
			this.settings.ticketProjects = [];
		} else {
			this.settings.ticketProjects = settingsData.ticketProjects.flatMap(
				(project) => {
					if (!isRecord(project)) return [];
					if (typeof project.id !== "string") return [];
					if (typeof project.name !== "string") return [];
					if (typeof project.undoneFolder !== "string") return [];
					if (typeof project.doneFolder !== "string") return [];
					return [
						{
							id: project.id,
							name: project.name,
							undoneFolder: project.undoneFolder,
							doneFolder: project.doneFolder,
							developmentLogPath:
								typeof project.developmentLogPath === "string"
									? project.developmentLogPath
									: "",
						},
					];
				}
			);
		}

		this.dashboardBoxStore.loadFromData(data);
	}
}
