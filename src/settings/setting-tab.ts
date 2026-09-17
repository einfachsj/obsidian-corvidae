import {
	App,
	DropdownComponent,
	PluginSettingTab,
	Setting,
	type SettingDefinitionItem,
} from "obsidian";
import { t, type CorvidaeLanguageSetting } from "../i18n";
import type CorvidaePlugin from "../main";
import { FolderPathSuggest, renderTicketProjectsEditor } from "../tickets";
import { openTipsNote } from "./open-tips-note";
import { DEFAULT_SETTINGS, type CustomGraphConfig, type CorvidaeSettings } from "./types";
import { normalizeFolderPath } from "../explorer/development-folders";
import { createCustomGraphId } from "../custom-graph";

type SettingKey = keyof CorvidaeSettings;

export class CorvidaeSettingTab extends PluginSettingTab {
	plugin: CorvidaePlugin;

	constructor(app: App, plugin: CorvidaePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getControlValue(key: string): unknown {
		const settings = this.plugin.settings;
		if (key === "folderNoteExcludePrefixes") {
			return settings.folderNoteExcludePrefixes.join(", ");
		}
		if (key === "defaultTags") {
			return settings.defaultTags.join(", ");
		}
		if (key === "minSize" || key === "maxSize" || key === "defaultSize" || key === "patchIntervalMs") {
			return String(settings[key]);
		}
		return settings[key as SettingKey];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		const settings = this.plugin.settings;

		if (key === "language" && typeof value === "string") {
			settings.language = value as CorvidaeLanguageSetting;
			await this.plugin.saveSettings();
			this.plugin.onLanguageChanged();
			this.update();
			return;
		}

		if (key === "folderNoteExcludePrefixes" && typeof value === "string") {
			settings.folderNoteExcludePrefixes = value
				.split(",")
				.map((p) => p.trim())
				.filter(Boolean);
			await this.plugin.saveSettings();
			return;
		}

		if (key === "defaultTags" && typeof value === "string") {
			settings.defaultTags = value
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean);
			await this.plugin.saveSettings();
			return;
		}

		if (
			(key === "minSize" ||
				key === "maxSize" ||
				key === "defaultSize" ||
				key === "patchIntervalMs") &&
			typeof value === "string"
		) {
			const num = parseInt(value, 10);
			if (isNaN(num)) return;
			if (key === "patchIntervalMs" && num < 100) return;
			settings[key] = num;
			await this.plugin.saveSettings();
			if (key === "minSize" || key === "maxSize") {
				this.plugin.refreshGraphFeatures();
			}
			if (key === "patchIntervalMs") {
				this.plugin.restartPatchInterval();
			}
			return;
		}

		if (key === "sizeProperty" && typeof value === "string") {
			settings.sizeProperty = value.trim() || "size";
			await this.plugin.saveSettings();
			this.plugin.registerCorvidaePropertyTypes();
			return;
		}

		if (key === "colorProperty" && typeof value === "string") {
			settings.colorProperty = value.trim() || "color";
			await this.plugin.saveSettings();
			this.plugin.registerCorvidaePropertyTypes();
			return;
		}

		if (key === "defaultColor" && typeof value === "string") {
			settings.defaultColor = value.trim() || DEFAULT_SETTINGS.defaultColor;
			await this.plugin.saveSettings();
			return;
		}

		if (typeof value === "boolean") {
			(settings as unknown as Record<string, unknown>)[key] = value;
			await this.plugin.saveSettings();
			if (
				key === "showLegend" ||
				key === "legendShowDefaultAndUncolored" ||
				key === "graphHideBaseEmbedLinks" ||
				key === "graphOnlyFrontmatterLinks"
			) {
				this.plugin.refreshGraphFeatures();
			}
			if (key === "showNoteFileTitle") {
				this.plugin.applyNoteFileTitleVisibility();
			}
			if (key === "dashboardAutoOpen" && value) {
				this.plugin.dashboardLayoutManager.scheduleSync();
			}
			return;
		}

		if (typeof value === "string") {
			(settings as unknown as Record<string, unknown>)[key] = value;
			await this.plugin.saveSettings();
		}
	}

	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				name: t("settings.tips.name"),
				desc: t("settings.tips.desc"),
				render: (setting) => {
					setting.addButton((button) =>
						button
							.setButtonText(t("settings.tips.button"))
							.setCta()
							.onClick(async () => {
								await openTipsNote(this.app, this.plugin);
							})
					);
				},
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
				},
			},
			{
				name: t("settings.showLegend.name"),
				desc: t("settings.showLegend.desc"),
				control: { type: "toggle", key: "showLegend" },
			},
			{
				name: t("settings.legendShowAll.name"),
				desc: t("settings.legendShowAll.desc"),
				control: { type: "toggle", key: "legendShowDefaultAndUncolored" },
			},
			{
				name: t("settings.graphHideBaseEmbedLinks.name"),
				desc: t("settings.graphHideBaseEmbedLinks.desc"),
				control: { type: "toggle", key: "graphHideBaseEmbedLinks" },
			},
			{
				name: t("settings.graphOnlyFrontmatterLinks.name"),
				desc: t("settings.graphOnlyFrontmatterLinks.desc"),
				control: { type: "toggle", key: "graphOnlyFrontmatterLinks" },
			},
			{
				name: t("settings.showNoteFileTitle.name"),
				desc: t("settings.showNoteFileTitle.desc"),
				control: { type: "toggle", key: "showNoteFileTitle" },
			},
			{
				type: "group",
				heading: t("settings.dashboard.heading"),
				items: [
					{
						name: t("settings.dashboard.autoOpen.name"),
						desc: t("settings.dashboard.autoOpen.desc"),
						control: { type: "toggle", key: "dashboardAutoOpen" },
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
						control: { type: "toggle", key: "ticketsSidebarAutoOpen" },
					},
					{
						name: t("settings.tickets.heading"),
						desc: t("settings.tickets.desc"),
						searchable: false,
						render: (setting) => {
							setting.settingEl.empty();
							renderTicketProjectsEditor(setting.settingEl, this.plugin, () =>
								this.update()
							);
						},
					},
				],
			},
			{
				name: t("settings.sizeProperty.name"),
				desc: t("settings.sizeProperty.desc"),
				control: { type: "text", key: "sizeProperty", placeholder: "size" },
			},
			{
				name: t("settings.minSize.name"),
				control: { type: "text", key: "minSize", placeholder: "1" },
			},
			{
				name: t("settings.maxSize.name"),
				control: { type: "text", key: "maxSize", placeholder: "100" },
			},
			{
				name: t("settings.colorProperty.name"),
				desc: t("settings.colorProperty.desc"),
				control: { type: "text", key: "colorProperty", placeholder: "color" },
			},
			{
				type: "group",
				heading: t("settings.folderNotes.heading"),
				items: [
					{
						name: t("settings.folderNotes.enabled.name"),
						desc: t("settings.folderNotes.enabled.desc"),
						control: { type: "toggle", key: "folderNoteEnabled" },
					},
					{
						name: t("settings.folderNotes.syncRename.name"),
						control: { type: "toggle", key: "folderNoteSyncRename" },
					},
					{
						name: t("settings.folderNotes.excludedPaths.name"),
						desc: t("settings.folderNotes.excludedPaths.desc"),
						control: {
							type: "text",
							key: "folderNoteExcludePrefixes",
							placeholder: `${this.app.vault.configDir}, .trash`,
						},
					},
					{
						name: t("settings.folderNotes.openOnClick.name"),
						control: { type: "toggle", key: "folderNoteOpenOnClick" },
					},
					{
						name: t("settings.folderNotes.hideInExplorer.name"),
						control: { type: "toggle", key: "folderNoteHideInExplorer" },
					},
				],
			},
			{
				name: t("settings.developmentFolders.heading"),
				desc: t("settings.developmentFolders.desc"),
				render: (setting) => {
					setting.settingEl.empty();
					this.renderDevelopmentFoldersSection(setting.settingEl);
				},
			},
			{
				name: t("settings.customGraph.heading"),
				desc: t("settings.customGraph.desc"),
				render: (setting) => {
					setting.settingEl.empty();
					this.renderCustomGraphSection(setting.settingEl);
				},
			},
			{
				type: "group",
				heading: t("settings.newNotes.heading"),
				items: [
					{
						name: t("settings.newNotes.autoFrontmatter.name"),
						desc: t("settings.newNotes.autoFrontmatter.desc"),
						control: { type: "toggle", key: "autoFrontmatter" },
					},
					{
						name: t("settings.newNotes.defaultTags.name"),
						desc: t("settings.newNotes.defaultTags.desc"),
						control: { type: "text", key: "defaultTags", placeholder: "" },
					},
					{
						name: t("settings.newNotes.defaultSize.name"),
						control: {
							type: "text",
							key: "defaultSize",
							placeholder: String(DEFAULT_SETTINGS.defaultSize),
						},
					},
					{
						name: t("settings.newNotes.defaultColor.name"),
						desc: t("settings.newNotes.defaultColor.desc"),
						control: {
							type: "text",
							key: "defaultColor",
							placeholder: DEFAULT_SETTINGS.defaultColor,
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
							type: "text",
							key: "patchIntervalMs",
							placeholder: String(DEFAULT_SETTINGS.patchIntervalMs),
						},
					},
				],
			},
		];
	}

	/** Fallback for Obsidian &lt; 1.13.0 */
	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		this.renderAllSettings(containerEl);
	}

	private renderAllSettings(containerEl: HTMLElement): void {
		containerEl.createEl("p", {
			text: t("settings.subtitle"),
			cls: "setting-item-description",
		});

		new Setting(containerEl)
			.setName(t("settings.tips.name"))
			.setDesc(t("settings.tips.desc"))
			.addButton((button) =>
				button
					.setButtonText(t("settings.tips.button"))
					.setCta()
					.onClick(async () => {
						await openTipsNote(this.app, this.plugin);
					})
			);

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

		new Setting(containerEl)
			.setName(t("settings.graphHideBaseEmbedLinks.name"))
			.setDesc(t("settings.graphHideBaseEmbedLinks.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.graphHideBaseEmbedLinks)
					.onChange(async (value) => {
						this.plugin.settings.graphHideBaseEmbedLinks = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraphFeatures();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.graphOnlyFrontmatterLinks.name"))
			.setDesc(t("settings.graphOnlyFrontmatterLinks.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.graphOnlyFrontmatterLinks)
					.onChange(async (value) => {
						this.plugin.settings.graphOnlyFrontmatterLinks = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraphFeatures();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.showNoteFileTitle.name"))
			.setDesc(t("settings.showNoteFileTitle.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showNoteFileTitle)
					.onChange(async (value) => {
						this.plugin.settings.showNoteFileTitle = value;
						await this.plugin.saveSettings();
						this.plugin.applyNoteFileTitleVisibility();
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

		new Setting(containerEl)
			.setHeading()
			.setName(t("settings.tickets.heading"))
			.setDesc(t("settings.tickets.desc"));

		new Setting(containerEl)
			.setName(t("settings.tickets.autoOpen.name"))
			.setDesc(t("settings.tickets.autoOpen.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.ticketsSidebarAutoOpen)
					.onChange(async (value) => {
						this.plugin.settings.ticketsSidebarAutoOpen = value;
						await this.plugin.saveSettings();
					})
			);

		renderTicketProjectsEditor(containerEl, this.plugin);

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

		this.renderDevelopmentFoldersSection(containerEl);
		this.renderCustomGraphSection(containerEl);

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
						this.plugin.settings.defaultColor =
							value.trim() || DEFAULT_SETTINGS.defaultColor;
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

	private renderDevelopmentFoldersSection(containerEl: HTMLElement): void {
		new Setting(containerEl)
			.setHeading()
			.setName(t("settings.developmentFolders.heading"))
			.setDesc(t("settings.developmentFolders.desc"));

		const listEl = containerEl.createDiv({
			cls: "corvidae-development-folders-list",
		});

		const renderList = (): void => {
			listEl.empty();
			this.plugin.settings.developmentFolders.forEach((path, index) => {
				new Setting(listEl)
					.addText((text) => {
						text
							.setPlaceholder(
								t("settings.developmentFolders.pathPlaceholder")
							)
							.setValue(path)
							.onChange(async (value) => {
								this.plugin.settings.developmentFolders[index] =
									normalizeFolderPath(value.trim());
								await this.plugin.saveSettings();
							});
						new FolderPathSuggest(this.app, text.inputEl, (folder) => {
							this.plugin.settings.developmentFolders[index] =
								normalizeFolderPath(folder.path);
							text.setValue(folder.path);
							void this.plugin.saveSettings();
						});
					})
					.addButton((button) =>
						button
							.setButtonText(t("settings.developmentFolders.remove"))
							.setDestructive()
							.onClick(async () => {
								this.plugin.settings.developmentFolders.splice(index, 1);
								await this.plugin.saveSettings();
								renderList();
							})
					);
			});
		};

		new Setting(containerEl).addButton((button) =>
			button
				.setButtonText(t("settings.developmentFolders.add"))
				.setCta()
				.onClick(async () => {
					this.plugin.settings.developmentFolders.push("");
					await this.plugin.saveSettings();
					renderList();
				})
		);

		renderList();
	}

	private renderCustomGraphSection(containerEl: HTMLElement): void {
		new Setting(containerEl)
			.setHeading()
			.setName(t("settings.customGraph.heading"))
			.setDesc(t("settings.customGraph.desc"));

		const listEl = containerEl.createDiv({
			cls: "corvidae-custom-graph-settings-list",
		});

		const renderList = (): void => {
			listEl.empty();
			this.plugin.settings.customGraphs.forEach((graph, index) => {
				this.renderCustomGraphCard(listEl, graph, index, renderList);
			});
		};

		new Setting(containerEl).addButton((button) =>
			button
				.setButtonText(t("settings.customGraph.add"))
				.setCta()
				.onClick(async () => {
					this.plugin.settings.customGraphs.push({
						id: createCustomGraphId(),
						name: t("settings.customGraph.defaultName"),
						folder: "",
						codeFolder: "",
					});
					await this.plugin.saveSettings();
					this.plugin.customGraphManager.onSettingsChanged();
					renderList();
				})
		);

		renderList();
	}

	private renderCustomGraphCard(
		listEl: HTMLElement,
		graph: CustomGraphConfig,
		index: number,
		rerender: () => void
	): void {
		const card = listEl.createDiv({ cls: "corvidae-custom-graph-settings-card" });

		new Setting(card)
			.setName(t("settings.customGraph.name"))
			.addText((text) =>
				text
					.setPlaceholder(t("settings.customGraph.namePlaceholder"))
					.setValue(graph.name)
					.onChange(async (value) => {
						graph.name = value;
						await this.plugin.saveSettings();
						this.plugin.customGraphManager.onSettingsChanged();
					})
			);

		new Setting(card)
			.setName(t("settings.customGraph.folder.name"))
			.setDesc(t("settings.customGraph.folder.desc"))
			.addText((text) => {
				text
					.setPlaceholder(t("settings.customGraph.folder.placeholder"))
					.setValue(graph.folder)
					.onChange(async (value) => {
						graph.folder = normalizeFolderPath(value.trim());
						await this.plugin.saveSettings();
						this.plugin.customGraphManager.onSettingsChanged();
					});
				new FolderPathSuggest(this.app, text.inputEl, (folder) => {
					graph.folder = normalizeFolderPath(folder.path);
					text.setValue(folder.path);
					void this.plugin.saveSettings().then(() => {
						this.plugin.customGraphManager.onSettingsChanged();
					});
				});
			});

		new Setting(card)
			.setName(t("settings.customGraph.codeFolder.name"))
			.setDesc(t("settings.customGraph.codeFolder.desc"))
			.addText((text) => {
				text
					.setPlaceholder(t("settings.customGraph.codeFolder.placeholder"))
					.setValue(graph.codeFolder ?? "")
					.onChange(async (value) => {
						graph.codeFolder = normalizeFolderPath(value.trim());
						await this.plugin.saveSettings();
						this.plugin.customGraphManager.onSettingsChanged();
					});
				new FolderPathSuggest(this.app, text.inputEl, (folder) => {
					graph.codeFolder = normalizeFolderPath(folder.path);
					text.setValue(folder.path);
					void this.plugin.saveSettings().then(() => {
						this.plugin.customGraphManager.onSettingsChanged();
					});
				});
			});

		new Setting(card).addButton((button) =>
			button
				.setButtonText(t("settings.customGraph.remove"))
				.setDestructive()
				.onClick(async () => {
					this.plugin.settings.customGraphs.splice(index, 1);
					await this.plugin.saveSettings();
					this.plugin.customGraphManager.onSettingsChanged();
					rerender();
				})
		);
	}
}
