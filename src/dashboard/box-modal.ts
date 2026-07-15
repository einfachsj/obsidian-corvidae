import { App, DropdownComponent, Modal, Notice, Setting } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import {
	DASHBOARD_BOX_TYPES,
	DEFAULT_BOX_COLS,
	DEFAULT_BOX_ROWS,
	type DashboardBox,
	type DashboardBoxType,
} from "./box-types";
import { getNoteDisplayLabel, NotePathSuggest } from "./note-suggest";
import {
	isTerminalPluginEnabled,
	resolveDefaultTerminalProfile,
} from "./terminal-integration";
import {
	isWebViewerEnabled,
	normalizeBrowserUrl,
} from "./browser-integration";

export class BoxModal extends Modal {
	private titleValue: string;
	private typeValue: DashboardBoxType;
	private notePathValue: string;
	private linkValue: string;
	private ticketProjectIdValue: string;
	private ticketDisplayModeValue: "last" | "all";
	private noteSettingEl: HTMLElement | null = null;
	private linkSettingEl: HTMLElement | null = null;
	private ticketProjectSettingEl: HTMLElement | null = null;
	private ticketDisplayModeSettingEl: HTMLElement | null = null;
	private noteInputEl: HTMLInputElement | null = null;
	private linkInputEl: HTMLInputElement | null = null;
	private noteSuggest: NotePathSuggest | null = null;
	private linkPreviewTimer: number | null = null;

	constructor(
		app: App,
		private plugin: CorvidaePlugin,
		private box?: DashboardBox
	) {
		super(app);
		this.titleValue = box?.title ?? "";
		this.typeValue = box?.type ?? "empty";
		this.notePathValue = box?.notePath ?? "";
		this.linkValue = box?.link ?? "";
		this.ticketProjectIdValue = box?.ticketProjectId ?? "";
		this.ticketDisplayModeValue = box?.ticketDisplayMode ?? "last";
	}

	get isEditMode(): boolean {
		return this.box !== undefined;
	}

	onOpen(): void {
		this.modalEl.addClass("corvidae-box-modal");
		const { contentEl, titleEl } = this;
		contentEl.empty();
		titleEl.setText(
			this.isEditMode
				? t("dashboard.box.modal.editTitle")
				: t("dashboard.box.modal.title")
		);

		new Setting(contentEl)
			.setName(t("dashboard.box.modal.boxTitle"))
			.addText((text) => {
				text.setValue(this.titleValue);
				text.setPlaceholder(t("dashboard.box.modal.boxTitle"));
				text.onChange((value) => {
					this.titleValue = value;
				});
				text.inputEl.addEventListener("keydown", (evt) => {
					if (
						evt.key === "Enter" &&
						this.typeValue !== "note" &&
						this.typeValue !== "browser"
					) {
						evt.preventDefault();
						void this.handleSave();
					}
				});
				window.setTimeout(() => text.inputEl.focus(), 0);
			});

		const typeSetting = new Setting(contentEl)
			.setName(t("dashboard.box.modal.type"))
			.addDropdown((dropdown: DropdownComponent) => {
				for (const type of DASHBOARD_BOX_TYPES) {
					if (type === "terminal" && !isTerminalPluginEnabled(this.app)) {
						continue;
					}
					dropdown.addOption(type, t(`dashboard.box.type.${type}`));
				}
				dropdown.setValue(this.typeValue);
				dropdown.onChange((value) => {
					this.typeValue = value as DashboardBoxType;
					this.syncTypeSettingVisibility();
					this.scheduleBrowserLinkPreview();
				});
			});
		typeSetting.settingEl.addClass("corvidae-box-type-setting");

		const noteSetting = new Setting(contentEl)
			.setName(t("dashboard.box.modal.note"))
			.setDesc(t("dashboard.box.modal.noteDesc"))
			.addText((text) => {
				this.noteInputEl = text.inputEl;
				this.noteInputEl.placeholder = t("dashboard.box.modal.notePlaceholder");
				this.noteInputEl.dataset.notePath = this.notePathValue;
				if (this.notePathValue) {
					const file = this.app.vault.getFileByPath(this.notePathValue);
					if (file) {
						text.setValue(getNoteDisplayLabel(this.app, file));
					} else {
						text.setValue(this.notePathValue);
					}
				}
				text.onChange((value) => {
					if (!value.trim()) {
						this.notePathValue = "";
						this.noteInputEl!.dataset.notePath = "";
					}
				});
				this.noteSuggest = new NotePathSuggest(this.app, this.noteInputEl, (file) => {
					this.notePathValue = file.path;
					this.noteInputEl!.dataset.notePath = file.path;
				});
			});
		this.noteSettingEl = noteSetting.settingEl;
		this.noteSettingEl.addClass("corvidae-box-note-setting");

		const linkSetting = new Setting(contentEl)
			.setName(t("dashboard.box.modal.link"))
			.setDesc(t("dashboard.box.modal.linkDesc"))
			.addText((text) => {
				this.linkInputEl = text.inputEl;
				this.linkInputEl.placeholder = t("dashboard.box.modal.linkPlaceholder");
				text.setValue(this.linkValue);
				text.onChange((value) => {
					this.linkValue = value;
					this.scheduleBrowserLinkPreview();
				});
			});
		this.linkSettingEl = linkSetting.settingEl;
		this.linkSettingEl.addClass("corvidae-box-link-setting");

		const ticketProjectSetting = new Setting(contentEl)
			.setName(t("dashboard.box.modal.ticketProject"))
			.setDesc(t("dashboard.box.modal.ticketProjectDesc"))
			.addDropdown((dropdown) => {
				dropdown.addOption("", t("dashboard.box.modal.ticketProjectPlaceholder"));
				for (const project of this.plugin.settings.ticketProjects) {
					const label = project.name.trim() || t("tickets.unnamedProject");
					dropdown.addOption(project.id, label);
				}
				dropdown.setValue(this.ticketProjectIdValue);
				dropdown.onChange((value) => {
					this.ticketProjectIdValue = value;
				});
			});
		this.ticketProjectSettingEl = ticketProjectSetting.settingEl;
		this.ticketProjectSettingEl.addClass("corvidae-box-ticket-project-setting");

		const ticketDisplaySetting = new Setting(contentEl)
			.setName(t("dashboard.box.modal.ticketDisplayMode"))
			.addDropdown((dropdown) => {
				dropdown
					.addOption("last", t("dashboard.box.modal.ticketDisplayMode.last"))
					.addOption("all", t("dashboard.box.modal.ticketDisplayMode.all"));
				dropdown.setValue(this.ticketDisplayModeValue);
				dropdown.onChange((value) => {
					this.ticketDisplayModeValue =
						value === "all" ? "all" : "last";
				});
			});
		this.ticketDisplayModeSettingEl = ticketDisplaySetting.settingEl;
		this.ticketDisplayModeSettingEl.addClass("corvidae-box-ticket-display-setting");

		this.syncTypeSettingVisibility();

		const actions = contentEl.createDiv({ cls: "corvidae-dashboard-modal-actions" });

		if (this.isEditMode) {
			const deleteBtn = actions.createEl("button", {
				cls: "corvidae-dashboard-modal-delete",
				text: t("dashboard.box.modal.delete"),
			});
			deleteBtn.addEventListener("click", () => {
				void this.handleDelete();
			});
		}

		const rightActions = actions.createDiv({
			cls: "corvidae-dashboard-modal-actions-right",
		});

		const cancelBtn = rightActions.createEl("button", {
			text: t("dashboard.box.modal.cancel"),
		});
		cancelBtn.addEventListener("click", () => this.close());

		const saveBtn = rightActions.createEl("button", {
			cls: "mod-cta",
			text: t("dashboard.box.modal.save"),
		});
		saveBtn.addEventListener("click", () => {
			void this.handleSave();
		});
	}

	onClose(): void {
		if (this.linkPreviewTimer !== null) {
			window.clearTimeout(this.linkPreviewTimer);
			this.linkPreviewTimer = null;
		}
		this.noteSuggest = null;
		this.noteInputEl = null;
		this.linkInputEl = null;
		this.noteSettingEl = null;
		this.linkSettingEl = null;
		this.ticketProjectSettingEl = null;
		this.ticketDisplayModeSettingEl = null;
		this.modalEl.removeClass("corvidae-box-modal");
		this.contentEl.empty();
	}

	private syncTypeSettingVisibility(): void {
		if (this.noteSettingEl) {
			this.noteSettingEl.toggleClass("is-hidden", this.typeValue !== "note");
		}
		if (this.linkSettingEl) {
			this.linkSettingEl.toggleClass("is-hidden", this.typeValue !== "browser");
		}
		if (this.ticketProjectSettingEl) {
			this.ticketProjectSettingEl.toggleClass(
				"is-hidden",
				this.typeValue !== "ticket"
			);
		}
		if (this.ticketDisplayModeSettingEl) {
			this.ticketDisplayModeSettingEl.toggleClass(
				"is-hidden",
				this.typeValue !== "ticket"
			);
		}
	}

	private scheduleBrowserLinkPreview(): void {
		if (!this.isEditMode || !this.box || this.typeValue !== "browser") return;

		if (this.linkPreviewTimer !== null) {
			window.clearTimeout(this.linkPreviewTimer);
		}

		this.linkPreviewTimer = window.setTimeout(() => {
			this.linkPreviewTimer = null;
			const normalized = normalizeBrowserUrl(this.linkValue);
			if (!normalized || !isWebViewerEnabled(this.app)) return;
			this.plugin.previewBrowserBoxLink(this.box!.id, normalized);
		}, 350);
	}

	private resolveNotePath(): string {
		const fromDataset = this.noteInputEl?.dataset.notePath?.trim();
		if (fromDataset) return fromDataset;

		const raw = this.notePathValue.trim();
		if (!raw) return "";

		const byPath = this.app.vault.getFileByPath(raw);
		if (byPath) return byPath.path;

		const match = this.app.vault
			.getMarkdownFiles()
			.find((file) => file.path === raw || file.basename === raw);
		return match?.path ?? raw;
	}

	private async handleSave(): Promise<void> {
		const title = this.titleValue.trim();
		if (!title) {
			new Notice(t("dashboard.box.error.titleRequired"));
			return;
		}

		const notePath = this.typeValue === "note" ? this.resolveNotePath() : undefined;
		if (this.typeValue === "note") {
			if (!notePath || !this.app.vault.getFileByPath(notePath)) {
				new Notice(t("dashboard.box.error.noteRequired"));
				return;
			}
		}

		let link: string | undefined;
		if (this.typeValue === "browser") {
			const normalized = normalizeBrowserUrl(this.linkValue);
			if (!normalized) {
				new Notice(t("dashboard.box.error.linkRequired"));
				return;
			}
			if (!isWebViewerEnabled(this.app)) {
				new Notice(t("dashboard.box.error.webviewerUnavailable"));
				return;
			}
			link = normalized;
		}

		if (this.typeValue === "terminal") {
			if (!resolveDefaultTerminalProfile(this.app)) {
				new Notice(t("dashboard.box.error.terminalUnavailable"));
				return;
			}
		}

		let ticketProjectId: string | undefined;
		let ticketDisplayMode: "last" | "all" | undefined;
		if (this.typeValue === "ticket") {
			if (!this.ticketProjectIdValue) {
				new Notice(t("dashboard.box.error.ticketProjectRequired"));
				return;
			}
			const project = this.plugin.settings.ticketProjects.find(
				(entry) => entry.id === this.ticketProjectIdValue
			);
			const logPath = project?.developmentLogPath?.trim();
			if (!logPath || !this.app.vault.getFileByPath(logPath)) {
				new Notice(t("dashboard.box.error.ticketLogMissing"));
				return;
			}
			ticketProjectId = this.ticketProjectIdValue;
			ticketDisplayMode = this.ticketDisplayModeValue;
		}

		if (this.isEditMode && this.box) {
			const result = await this.plugin.dashboardBoxStore.updateBox(this.box.id, {
				title,
				type: this.typeValue,
				notePath,
				link,
				ticketProjectId,
				ticketDisplayMode,
			});
			if (!result.ok) return;
		} else {
			const result = await this.plugin.dashboardBoxStore.addBox({
				title,
				type: this.typeValue,
				notePath,
				link,
				ticketProjectId,
				ticketDisplayMode,
				cols: DEFAULT_BOX_COLS,
				rows: DEFAULT_BOX_ROWS,
			});
			if (!result.ok) {
				new Notice(t("dashboard.box.error.noSpace"));
				return;
			}
		}

		this.plugin.refreshDashboardViews();
		this.plugin.resyncDashboardBrowserEmbeds();
		this.plugin.resyncDashboardTicketEmbeds();
		this.close();
	}

	private async handleDelete(): Promise<void> {
		if (!this.box) return;

		const result = await this.plugin.dashboardBoxStore.deleteBox(this.box.id);
		if (!result.ok) return;

		this.plugin.refreshDashboardViews();
		this.close();
	}
}
