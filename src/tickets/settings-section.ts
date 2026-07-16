import { Setting } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import type { TicketProjectConfig } from "../settings";
import { activateTicketsSidebar } from "./activate";
import { FolderPathSuggest } from "./folder-suggest";
import { NotePathSuggest, getNoteDisplayLabel } from "../dashboard/note-suggest";

function createProjectId(): string {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return `ticket-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function renderTicketsSettingsSection(
	containerEl: HTMLElement,
	plugin: CorvidaePlugin
): void {
	new Setting(containerEl)
		.setHeading()
		.setName(t("settings.tickets.heading"))
		.setDesc(t("settings.tickets.desc"));

	new Setting(containerEl)
		.setName(t("settings.tickets.autoOpen.name"))
		.setDesc(t("settings.tickets.autoOpen.desc"))
		.addToggle((toggle) =>
			toggle
				.setValue(plugin.settings.ticketsSidebarAutoOpen)
				.onChange(async (value) => {
					plugin.settings.ticketsSidebarAutoOpen = value;
					await plugin.saveSettings();
					if (value) {
						void activateTicketsSidebar(plugin.app);
					}
				})
		);

	const listEl = containerEl.createDiv({ cls: "corvidae-tickets-settings-list" });

	const renderProjects = (): void => {
		listEl.empty();
		for (const project of plugin.settings.ticketProjects) {
			renderProjectCard(listEl, plugin, project, renderProjects);
		}
	};

	new Setting(containerEl)
		.addButton((button) =>
			button
				.setButtonText(t("settings.tickets.addProject"))
				.setCta()
				.onClick(async () => {
					plugin.settings.ticketProjects.push({
						id: createProjectId(),
						name: t("settings.tickets.defaultProjectName"),
						undoneFolder: "",
						doneFolder: "",
						developmentLogPath: "",
					});
					await plugin.saveSettings();
					plugin.refreshTicketsViews();
					renderProjects();
				})
		);

	renderProjects();
}

function renderProjectCard(
	listEl: HTMLElement,
	plugin: CorvidaePlugin,
	project: TicketProjectConfig,
	rerender: () => void
): void {
	const card = listEl.createDiv({ cls: "corvidae-tickets-settings-card" });

	new Setting(card)
		.setName(t("settings.tickets.projectName"))
		.addText((text) =>
			text
				.setPlaceholder(t("settings.tickets.projectNamePlaceholder"))
				.setValue(project.name)
				.onChange(async (value) => {
					project.name = value;
					await plugin.saveSettings();
					plugin.refreshTicketsViews();
				})
		);

	new Setting(card)
		.setName(t("settings.tickets.undoneFolder"))
		.setDesc(t("settings.tickets.undoneFolderDesc"))
		.addText((text) => {
			text
				.setPlaceholder("ORGANISATION/Project/Tickets/Open")
				.setValue(project.undoneFolder)
				.onChange(async (value) => {
					project.undoneFolder = value.trim();
					await plugin.saveSettings();
					plugin.refreshTicketsViews();
				});
			new FolderPathSuggest(plugin.app, text.inputEl, (folder) => {
				project.undoneFolder = folder.path;
				text.setValue(folder.path);
				void plugin.saveSettings();
				plugin.refreshTicketsViews();
			});
		});

	new Setting(card)
		.setName(t("settings.tickets.doneFolder"))
		.setDesc(t("settings.tickets.doneFolderDesc"))
		.addText((text) => {
			text
				.setPlaceholder("ORGANISATION/Project/Tickets/Done")
				.setValue(project.doneFolder)
				.onChange(async (value) => {
					project.doneFolder = value.trim();
					await plugin.saveSettings();
					plugin.refreshTicketsViews();
				});
			new FolderPathSuggest(plugin.app, text.inputEl, (folder) => {
				project.doneFolder = folder.path;
				text.setValue(folder.path);
				void plugin.saveSettings();
				plugin.refreshTicketsViews();
			});
		});

	new Setting(card)
		.setName(t("settings.tickets.developmentLogPath"))
		.setDesc(t("settings.tickets.developmentLogPathDesc"))
		.addText((text) => {
			text
				.setPlaceholder("ORGANISATION/Project/ENTWICKLUNG/ENTWICKLUNG.md")
				.setValue(project.developmentLogPath ?? "");
			if (project.developmentLogPath) {
				const file = plugin.app.vault.getFileByPath(project.developmentLogPath);
				if (file) {
					text.setValue(getNoteDisplayLabel(plugin.app, file));
				}
			}
			text.onChange(async (value) => {
				if (!value.trim()) {
					project.developmentLogPath = "";
					await plugin.saveSettings();
					plugin.refreshTicketsViews();
					plugin.resyncDashboardTicketEmbeds();
					return;
				}
				const byPath = plugin.app.vault.getFileByPath(value.trim());
				if (byPath) {
					project.developmentLogPath = byPath.path;
				} else {
					project.developmentLogPath = value.trim();
				}
				await plugin.saveSettings();
				plugin.refreshTicketsViews();
				plugin.resyncDashboardTicketEmbeds();
			});
			new NotePathSuggest(plugin.app, text.inputEl, (file) => {
				project.developmentLogPath = file.path;
				text.setValue(getNoteDisplayLabel(plugin.app, file));
				void plugin.saveSettings();
				plugin.refreshTicketsViews();
				plugin.resyncDashboardTicketEmbeds();
			});
		});

	new Setting(card).addButton((button) =>
		button
			.setButtonText(t("settings.tickets.removeProject"))
			.setWarning()
			.onClick(async () => {
				plugin.settings.ticketProjects = plugin.settings.ticketProjects.filter(
					(entry) => entry.id !== project.id
				);
				await plugin.saveSettings();
				plugin.refreshTicketsViews();
				rerender();
			})
	);
}
