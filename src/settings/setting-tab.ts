import { App, DropdownComponent, PluginSettingTab, Setting } from "obsidian";
import { t, type CorvidaeLanguageSetting } from "../i18n";
import type CorvidaePlugin from "../main";
import { FolderPathSuggest, renderTicketsSettingsSection } from "../tickets";
import { openTipsNote } from "./open-tips-note";
import { DEFAULT_SETTINGS, type CustomGraphConfig } from "./types";
import { normalizeFolderPath } from "../explorer/development-folders";
import { createCustomGraphId } from "../custom-graph";

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
							.setWarning()
							.onClick(async () => {
								this.plugin.settings.developmentFolders.splice(
									index,
									1
								);
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
				.setWarning()
				.onClick(async () => {
					this.plugin.settings.customGraphs.splice(index, 1);
					await this.plugin.saveSettings();
					this.plugin.customGraphManager.onSettingsChanged();
					rerender();
				})
		);
	}
}
