import { App, TFile } from "obsidian";
import { isExcalidrawFile } from "../explorer/file-tags";
import type { CorvidaeSettings } from "../settings";

export class NoteBootstrap {
	constructor(
		private app: App,
		private settings: CorvidaeSettings
	) {}

	updateSettings(settings: CorvidaeSettings): void {
		this.settings = settings;
	}

	async onFileCreated(file: TFile): Promise<TFile> {
		if (!this.settings.autoFrontmatter) return file;
		if (file.extension !== "md") return file;
		if (isExcalidrawFile(this.app, file)) return file;

		const target = this.app.vault.getAbstractFileByPath(file.path) ?? file;
		if (!(target instanceof TFile)) return file;

		await this.app.fileManager.processFrontMatter(target, (fm) => {
			if (fm.aliases === undefined || fm.aliases === null) {
				fm.aliases = [target.basename];
			} else if (Array.isArray(fm.aliases) && fm.aliases.length === 0) {
				fm.aliases = [target.basename];
			}

			if (fm.tags === undefined || fm.tags === null) {
				fm.tags = [...this.settings.defaultTags];
			}

			const sizeKey = this.settings.sizeProperty;
			if (fm[sizeKey] === undefined || fm[sizeKey] === null || fm[sizeKey] === "") {
				fm[sizeKey] = this.settings.defaultSize;
			}

			const colorKey = this.settings.colorProperty;
			if (fm[colorKey] === undefined || fm[colorKey] === null || fm[colorKey] === "") {
				fm[colorKey] = this.settings.defaultColor;
			}
		});

		await this.ensureDefaultBodySeparator(target);

		return this.app.vault.getFileByPath(target.path) ?? target;
	}

	private async ensureDefaultBodySeparator(file: TFile): Promise<void> {
		const content = await this.app.vault.read(file);
		const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
		const body = match ? match[1].trim() : content.trim();
		if (body !== "") return;

		const suffix = content.endsWith("\n") ? "---\n" : "\n---\n";
		await this.app.vault.modify(file, content + suffix);
	}
}
