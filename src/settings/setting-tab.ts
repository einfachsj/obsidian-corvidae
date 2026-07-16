import { App, PluginSettingTab, type SettingDefinitionItem } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import { activateTicketsSidebar } from "../tickets";
import { renderTicketProjectsEditor } from "../tickets/settings-section";
import { DEFAULT_SETTINGS, type CorvidaeSettings } from "./types";

type SettingsKey = keyof CorvidaeSettings;

export class CorvidaeSettingTab extends PluginSettingTab {
	plugin: CorvidaePlugin;

	constructor(app: App, plugin: CorvidaePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getControlValue(key: string): unknown {
		return this.plugin.settings[key as SettingsKey];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		const settings = this.plugin.settings as unknown as Record<string, unknown>;
		if (key === "sizeProperty" && typeof value === "string") {
			settings[key] = value.trim() || "size";
		} else if (key === "colorProperty" && typeof value === "string") {
			settings[key] = value.trim() || "color";
		} else if (key === "defaultColor" && typeof value === "string") {
			settings[key] = value.trim() || DEFAULT_SETTINGS.defaultColor;
		} else {
			settings[key] = value;
		}
		await this.plugin.saveSettings();
		this.applySettingSideEffects(key as SettingsKey, settings[key]);
	}

	private applySettingSideEffects(key: SettingsKey, value: unknown): void {
		switch (key) {
			case "language":
				this.plugin.onLanguageChanged();
				this.update();
				break;
			case "showLegend":
			case "legendShowDefaultAndUncolored":
			case "minSize":
			case "maxSize":
				this.plugin.refreshGraphFeatures();
				break;
			case "sizeProperty":
			case "colorProperty":
				this.plugin.registerCorvidaePropertyTypes();
				break;
			case "dashboardAutoOpen":
				if (value === true) {
					this.plugin.dashboardLayoutManager.scheduleSync();
				}
				break;
			case "ticketsSidebarAutoOpen":
				if (value === true) {
					void activateTicketsSidebar(this.plugin.app);
				}
				break;
			case "patchIntervalMs":
				this.plugin.restartPatchInterval();
				break;
			default:
				break;
		}
	}

	getSettingDefinitions(): SettingDefinitionItem<SettingsKey>[] {
		return [
			{
				name: t("settings.subtitle"),
				searchable: false,
			},
			{
				name: t("settings.language.name"),
				desc: t("settings.language.desc"),
				control: {
					type: "dropdown",
					key: "language",
					options: {
						auto: t("settings.language.auto"),
						en: t("settings.language.en"),
						de: t("settings.language.de"),
					},
					defaultValue: DEFAULT_SETTINGS.language,
				},
			},
			{
				name: t("settings.showLegend.name"),
				desc: t("settings.showLegend.desc"),
				control: {
					type: "toggle",
					key: "showLegend",
					defaultValue: DEFAULT_SETTINGS.showLegend,
				},
			},
			{
				name: t("settings.legendShowAll.name"),
				desc: t("settings.legendShowAll.desc"),
				control: {
					type: "toggle",
					key: "legendShowDefaultAndUncolored",
					defaultValue: DEFAULT_SETTINGS.legendShowDefaultAndUncolored,
				},
			},
			{
				type: "group",
				heading: t("settings.dashboard.heading"),
				items: [
					{
						name: t("settings.dashboard.autoOpen.name"),
						desc: t("settings.dashboard.autoOpen.desc"),
						control: {
							type: "toggle",
							key: "dashboardAutoOpen",
							defaultValue: DEFAULT_SETTINGS.dashboardAutoOpen,
						},
					},
				],
			},
			{
				type: "group",
				heading: t("settings.tickets.heading"),
				items: [
					{
						name: t("settings.tickets.autoOpen.name"),
						desc: t("settings.tickets.autoOpen.desc"),
						control: {
							type: "toggle",
							key: "ticketsSidebarAutoOpen",
							defaultValue: DEFAULT_SETTINGS.ticketsSidebarAutoOpen,
						},
					},
					{
						name: t("settings.tickets.desc"),
						searchable: false,
						render: (setting) => {
							setting.settingEl.addClass("corvidae-tickets-settings-render");
							setting.controlEl.empty();
							renderTicketProjectsEditor(setting.controlEl, this.plugin, () =>
								this.update()
							);
						},
					},
				],
			},
			{
				name: t("settings.sizeProperty.name"),
				desc: t("settings.sizeProperty.desc"),
				control: {
					type: "text",
					key: "sizeProperty",
					placeholder: "size",
					defaultValue: DEFAULT_SETTINGS.sizeProperty,
				},
			},
			{
				name: t("settings.minSize.name"),
				control: {
					type: "number",
					key: "minSize",
					placeholder: "1",
					defaultValue: DEFAULT_SETTINGS.minSize,
				},
			},
			{
				name: t("settings.maxSize.name"),
				control: {
					type: "number",
					key: "maxSize",
					placeholder: "100",
					defaultValue: DEFAULT_SETTINGS.maxSize,
				},
			},
			{
				name: t("settings.colorProperty.name"),
				desc: t("settings.colorProperty.desc"),
				control: {
					type: "text",
					key: "colorProperty",
					placeholder: "color",
					defaultValue: DEFAULT_SETTINGS.colorProperty,
				},
			},
			{
				type: "group",
				heading: t("settings.folderNotes.heading"),
				items: [
					{
						name: t("settings.folderNotes.enabled.name"),
						desc: t("settings.folderNotes.enabled.desc"),
						control: {
							type: "toggle",
							key: "folderNoteEnabled",
							defaultValue: DEFAULT_SETTINGS.folderNoteEnabled,
						},
					},
					{
						name: t("settings.folderNotes.syncRename.name"),
						control: {
							type: "toggle",
							key: "folderNoteSyncRename",
							defaultValue: DEFAULT_SETTINGS.folderNoteSyncRename,
						},
					},
					{
						name: t("settings.folderNotes.excludedPaths.name"),
						desc: t("settings.folderNotes.excludedPaths.desc"),
						render: (setting) => {
							setting.addText((text) =>
								text
									.setPlaceholder(`${this.app.vault.configDir}, .trash`)
									.setValue(
										this.plugin.settings.folderNoteExcludePrefixes.join(", ")
									)
									.onChange(async (value) => {
										this.plugin.settings.folderNoteExcludePrefixes = value
											.split(",")
											.map((p) => p.trim())
											.filter(Boolean);
										await this.plugin.saveSettings();
									})
							);
						},
					},
					{
						name: t("settings.folderNotes.openOnClick.name"),
						control: {
							type: "toggle",
							key: "folderNoteOpenOnClick",
							defaultValue: DEFAULT_SETTINGS.folderNoteOpenOnClick,
						},
					},
					{
						name: t("settings.folderNotes.hideInExplorer.name"),
						control: {
							type: "toggle",
							key: "folderNoteHideInExplorer",
							defaultValue: DEFAULT_SETTINGS.folderNoteHideInExplorer,
						},
					},
				],
			},
			{
				type: "group",
				heading: t("settings.newNotes.heading"),
				items: [
					{
						name: t("settings.newNotes.autoFrontmatter.name"),
						desc: t("settings.newNotes.autoFrontmatter.desc"),
						control: {
							type: "toggle",
							key: "autoFrontmatter",
							defaultValue: DEFAULT_SETTINGS.autoFrontmatter,
						},
					},
					{
						name: t("settings.newNotes.defaultTags.name"),
						desc: t("settings.newNotes.defaultTags.desc"),
						render: (setting) => {
							setting.addText((text) =>
								text
									.setPlaceholder("")
									.setValue(this.plugin.settings.defaultTags.join(", "))
									.onChange(async (value) => {
										this.plugin.settings.defaultTags = value
											.split(",")
											.map((tag) => tag.trim())
											.filter(Boolean);
										await this.plugin.saveSettings();
									})
							);
						},
					},
					{
						name: t("settings.newNotes.defaultSize.name"),
						control: {
							type: "number",
							key: "defaultSize",
							placeholder: String(DEFAULT_SETTINGS.defaultSize),
							defaultValue: DEFAULT_SETTINGS.defaultSize,
						},
					},
					{
						name: t("settings.newNotes.defaultColor.name"),
						desc: t("settings.newNotes.defaultColor.desc"),
						control: {
							type: "text",
							key: "defaultColor",
							placeholder: DEFAULT_SETTINGS.defaultColor,
							defaultValue: DEFAULT_SETTINGS.defaultColor,
						},
					},
				],
			},
			{
				type: "group",
				heading: t("settings.advanced.heading"),
				items: [
					{
						name: t("settings.advanced.patchInterval.name"),
						desc: t("settings.advanced.patchInterval.desc"),
						control: {
							type: "number",
							key: "patchIntervalMs",
							min: 100,
							placeholder: String(DEFAULT_SETTINGS.patchIntervalMs),
							defaultValue: DEFAULT_SETTINGS.patchIntervalMs,
						},
					},
				],
			},
		];
	}

	/** Legacy fallback for Obsidian &lt; 1.13 — unused when getSettingDefinitions is non-empty. */
	display(): void {
		this.containerEl.empty();
		this.containerEl.createEl("p", {
			text: t("settings.subtitle"),
			cls: "setting-item-description",
		});
	}
}
