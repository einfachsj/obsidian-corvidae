import { App, Notice, TFile, TFolder } from "obsidian";
import { t } from "../i18n";
import { NoteBootstrap } from "../note-bootstrap";
import type { TicketProjectConfig } from "../settings";

const TICKET_PATTERN = /^TICKET (\d+)$/i;

export class TicketManager {
	constructor(
		private app: App,
		private noteBootstrap: NoteBootstrap
	) {}

	getNextTicketNumber(project: TicketProjectConfig): number {
		let max = 0;
		for (const folderPath of [project.undoneFolder, project.doneFolder]) {
			const folder = this.app.vault.getAbstractFileByPath(folderPath);
			if (!(folder instanceof TFolder)) continue;
			for (const child of folder.children) {
				if (!(child instanceof TFile) || child.extension !== "md") continue;
				const match = child.basename.match(TICKET_PATTERN);
				if (match) {
					max = Math.max(max, parseInt(match[1], 10));
				}
			}
		}
		return max + 1;
	}

	formatTicketName(num: number): string {
		const digits = Math.max(2, String(num).length);
		return `TICKET ${String(num).padStart(digits, "0")}`;
	}

	validateProject(project: TicketProjectConfig): string | null {
		if (!project.name.trim()) {
			return t("tickets.error.nameRequired");
		}
		if (!project.undoneFolder.trim()) {
			return t("tickets.error.undoneRequired");
		}
		if (!project.doneFolder.trim()) {
			return t("tickets.error.doneRequired");
		}
		const undone = this.app.vault.getAbstractFileByPath(project.undoneFolder);
		if (!(undone instanceof TFolder)) {
			return t("tickets.error.undoneMissing");
		}
		const done = this.app.vault.getAbstractFileByPath(project.doneFolder);
		if (!(done instanceof TFolder)) {
			return t("tickets.error.doneMissing");
		}
		return null;
	}

	async createTicket(
		project: TicketProjectConfig,
		body: string
	): Promise<TFile | null> {
		const trimmed = body.trim();
		if (!trimmed) {
			new Notice(t("tickets.error.bodyRequired"));
			return null;
		}

		const validationError = this.validateProject(project);
		if (validationError) {
			new Notice(validationError);
			return null;
		}

		const number = this.getNextTicketNumber(project);
		const ticketName = this.formatTicketName(number);
		const filePath = `${project.undoneFolder}/${ticketName}.md`;

		if (this.app.vault.getAbstractFileByPath(filePath)) {
			new Notice(t("tickets.error.alreadyExists").replace("{name}", ticketName));
			return null;
		}

		try {
			const file = await this.app.vault.create(filePath, trimmed);
			await this.noteBootstrap.onFileCreated(file);
			new Notice(
				t("tickets.notice.created").replace("{name}", ticketName)
			);
			return file;
		} catch {
			new Notice(t("tickets.error.createFailed"));
			return null;
		}
	}
}
