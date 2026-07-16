import { App, TFile } from "obsidian";
import { isExcalidrawFile } from "../explorer/file-tags";
import { isRecord } from "../frontmatter/utils";
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
			const data: Record<string, unknown> = isRecord(fm) ? fm : (fm as Record<string, unknown>);

			const aliases = data.aliases;
			if (aliases === undefined || aliases === null) {
				data.aliases = [target.basename];
			} else if (Array.isArray(aliases) && aliases.length === 0) {
				data.aliases = [target.basename];
			}

			const tags = data.tags;
			if (tags === undefined || tags === null) {
				data.tags = [...this.settings.defaultTags];
			}

			const sizeKey = this.settings.sizeProperty;
			const sizeVal = data[sizeKey];
			if (sizeVal === undefined || sizeVal === null || sizeVal === "") {
				data[sizeKey] = this.settings.defaultSize;
			}

			const colorKey = this.settings.colorProperty;
			const colorVal = data[colorKey];
			if (colorVal === undefined || colorVal === null || colorVal === "") {
				data[colorKey] = this.settings.defaultColor;
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
