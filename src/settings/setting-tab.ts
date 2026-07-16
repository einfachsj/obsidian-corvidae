import { App, DropdownComponent, PluginSettingTab, Setting } from "obsidian";
import { t, type CorvidaeLanguageSetting } from "../i18n";
import type CorvidaePlugin from "../main";
import { renderTicketsSettingsSection } from "../tickets";
import { DEFAULT_SETTINGS } from "./types";

export class CorvidaeSettingTab extends PluginSettingTab {
	plugin: CorvidaePlugin;

	constructor(app: App, plugin: CorvidaePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("p", {
			text: t("settings.subtitle"),
			cls: "setting-item-description",
		});

		new Setting(containerEl)
			.setName(t("settings.language.name"))
			.setDesc(t("settings.language.desc"))
			.addDropdown((dropdown: DropdownComponent) => {
				dropdown
					.addOption("auto", t("settings.language.auto"))
					.addOption("en", t("settings.language.en"))
					.addOption("de", t("settings.language.de"))
					.setValue(this.plugin.settings.language)
					.onChange(async (value) => {
						this.plugin.settings.language = value as CorvidaeLanguageSetting;
						await this.plugin.saveSettings();
						this.plugin.onLanguageChanged();
						this.display();
					});
			});

		new Setting(containerEl)
			.setName(t("settings.showLegend.name"))
			.setDesc(t("settings.showLegend.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showLegend)
					.onChange(async (value) => {
						this.plugin.settings.showLegend = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraphFeatures();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.legendShowAll.name"))
			.setDesc(t("settings.legendShowAll.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.legendShowDefaultAndUncolored)
					.onChange(async (value) => {
						this.plugin.settings.legendShowDefaultAndUncolored = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraphFeatures();
					})
			);

		new Setting(containerEl).setHeading().setName(t("settings.dashboard.heading"));

		new Setting(containerEl)
			.setName(t("settings.dashboard.autoOpen.name"))
			.setDesc(t("settings.dashboard.autoOpen.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.dashboardAutoOpen)
					.onChange(async (value) => {
						this.plugin.settings.dashboardAutoOpen = value;
						await this.plugin.saveSettings();
						if (value) {
							this.plugin.dashboardLayoutManager.scheduleSync();
						}
					})
			);

		renderTicketsSettingsSection(containerEl, this.plugin);

		new Setting(containerEl)
			.setName(t("settings.sizeProperty.name"))
			.setDesc(t("settings.sizeProperty.desc"))
			.addText((text) =>
				text
					.setPlaceholder("size")
					.setValue(this.plugin.settings.sizeProperty)
					.onChange(async (value) => {
						this.plugin.settings.sizeProperty = value.trim() || "size";
						await this.plugin.saveSettings();
						this.plugin.registerCorvidaePropertyTypes();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.minSize.name"))
			.addText((text) =>
				text
					.setPlaceholder("1")
					.setValue(String(this.plugin.settings.minSize))
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num)) {
							this.plugin.settings.minSize = num;
							await this.plugin.saveSettings();
							this.plugin.refreshGraphFeatures();
						}
					})
			);

		new Setting(containerEl)
			.setName(t("settings.maxSize.name"))
			.addText((text) =>
				text
					.setPlaceholder("100")
					.setValue(String(this.plugin.settings.maxSize))
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num)) {
							this.plugin.settings.maxSize = num;
							await this.plugin.saveSettings();
							this.plugin.refreshGraphFeatures();
						}
					})
			);

		new Setting(containerEl)
			.setName(t("settings.colorProperty.name"))
			.setDesc(t("settings.colorProperty.desc"))
			.addText((text) =>
				text
					.setPlaceholder("color")
					.setValue(this.plugin.settings.colorProperty)
					.onChange(async (value) => {
						this.plugin.settings.colorProperty = value.trim() || "color";
						await this.plugin.saveSettings();
						this.plugin.registerCorvidaePropertyTypes();
					})
			);

		new Setting(containerEl).setHeading().setName(t("settings.folderNotes.heading"));

		new Setting(containerEl)
			.setName(t("settings.folderNotes.enabled.name"))
			.setDesc(t("settings.folderNotes.enabled.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.folderNoteEnabled)
					.onChange(async (value) => {
						this.plugin.settings.folderNoteEnabled = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.folderNotes.syncRename.name"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.folderNoteSyncRename)
					.onChange(async (value) => {
						this.plugin.settings.folderNoteSyncRename = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.folderNotes.excludedPaths.name"))
			.setDesc(t("settings.folderNotes.excludedPaths.desc"))
			.addText((text) =>
				text
					.setPlaceholder(`${this.app.vault.configDir}, .trash`)
					.setValue(this.plugin.settings.folderNoteExcludePrefixes.join(", "))
					.onChange(async (value) => {
						this.plugin.settings.folderNoteExcludePrefixes = value
							.split(",")
							.map((p) => p.trim())
							.filter(Boolean);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.folderNotes.openOnClick.name"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.folderNoteOpenOnClick)
					.onChange(async (value) => {
						this.plugin.settings.folderNoteOpenOnClick = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.folderNotes.hideInExplorer.name"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.folderNoteHideInExplorer)
					.onChange(async (value) => {
						this.plugin.settings.folderNoteHideInExplorer = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setHeading().setName(t("settings.newNotes.heading"));

		new Setting(containerEl)
			.setName(t("settings.newNotes.autoFrontmatter.name"))
			.setDesc(t("settings.newNotes.autoFrontmatter.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.autoFrontmatter)
					.onChange(async (value) => {
						this.plugin.settings.autoFrontmatter = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.newNotes.defaultTags.name"))
			.setDesc(t("settings.newNotes.defaultTags.desc"))
			.addText((text) =>
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

		new Setting(containerEl)
			.setName(t("settings.newNotes.defaultSize.name"))
			.addText((text) =>
				text
					.setPlaceholder(String(DEFAULT_SETTINGS.defaultSize))
					.setValue(String(this.plugin.settings.defaultSize))
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num)) {
							this.plugin.settings.defaultSize = num;
							await this.plugin.saveSettings();
						}
					})
			);

		new Setting(containerEl)
			.setName(t("settings.newNotes.defaultColor.name"))
			.setDesc(t("settings.newNotes.defaultColor.desc"))
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.defaultColor)
					.setValue(this.plugin.settings.defaultColor)
					.onChange(async (value) => {
						this.plugin.settings.defaultColor = value.trim() || DEFAULT_SETTINGS.defaultColor;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setHeading().setName(t("settings.advanced.heading"));

		new Setting(containerEl)
			.setName(t("settings.advanced.patchInterval.name"))
			.setDesc(t("settings.advanced.patchInterval.desc"))
			.addText((text) =>
				text
					.setPlaceholder(String(DEFAULT_SETTINGS.patchIntervalMs))
					.setValue(String(this.plugin.settings.patchIntervalMs))
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num) && num >= 100) {
							this.plugin.settings.patchIntervalMs = num;
							await this.plugin.saveSettings();
							this.plugin.restartPatchInterval();
						}
					})
			);
	}
}
