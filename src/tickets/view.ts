import { ItemView, WorkspaceLeaf } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import type { TicketProjectConfig } from "../settings";

export const CORVIDAE_TICKETS_VIEW = "corvidae-tickets";

export class CorvidaeTicketsView extends ItemView {
	private plugin: CorvidaePlugin;
	private ticketsContentEl!: HTMLElement;

	constructor(leaf: WorkspaceLeaf, plugin: CorvidaePlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return CORVIDAE_TICKETS_VIEW;
	}

	getDisplayText(): string {
		return t("tickets.viewTitle");
	}

	getIcon(): string {
		return "list-checks";
	}

	async onOpen(): Promise<void> {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("corvidae-tickets-view");
		this.ticketsContentEl = contentEl.createDiv({
			cls: "corvidae-tickets-content",
		});
		this.render();
		requestAnimationFrame(() => {
			this.containerEl
				.closest(".workspace-tabs")
				?.addClass("corvidae-tickets-sidebar-bottom");
		});
	}

	async onClose(): Promise<void> {
		this.contentEl.empty();
	}

	refresh(): void {
		this.render();
	}

	private render(): void {
		if (!this.ticketsContentEl) return;
		this.ticketsContentEl.empty();

		const projects = this.plugin.settings.ticketProjects;
		if (projects.length === 0) {
			this.ticketsContentEl.createEl("p", {
				cls: "corvidae-tickets-empty",
				text: t("tickets.empty"),
			});
			return;
		}

		for (const project of projects) {
			this.renderProject(project);
		}
	}

	private renderProject(project: TicketProjectConfig): void {
		const block = this.ticketsContentEl.createDiv({ cls: "corvidae-tickets-project" });
		block.createEl("h4", {
			cls: "corvidae-tickets-project-title",
			text: project.name || t("tickets.unnamedProject"),
		});

		const validationError = this.plugin.ticketManager.validateProject(project);
		if (validationError) {
			block.createEl("p", {
				cls: "corvidae-tickets-project-error",
				text: validationError,
			});
			return;
		}

		const input = block.createEl("textarea", {
			cls: "corvidae-tickets-input",
			attr: {
				placeholder: t("tickets.inputPlaceholder"),
				rows: "3",
			},
		});

		const actions = block.createDiv({ cls: "corvidae-tickets-actions" });
		const createBtn = actions.createEl("button", {
			cls: "mod-cta",
			text: t("tickets.create"),
		});

		const handleCreate = (): void => {
			void this.plugin.ticketManager
				.createTicket(project, input.value)
				.then((file) => {
					if (file) input.value = "";
				});
		};

		this.registerDomEvent(createBtn, "click", handleCreate);
		this.registerDomEvent(input, "keydown", (evt: KeyboardEvent) => {
			if (evt.key === "Enter" && (evt.ctrlKey || evt.metaKey)) {
				evt.preventDefault();
				handleCreate();
			}
		});
	}
}
