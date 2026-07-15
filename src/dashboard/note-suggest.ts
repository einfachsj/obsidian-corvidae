import {
	AbstractInputSuggest,
	App,
	prepareFuzzySearch,
	TFile,
} from "obsidian";
import { resolveFirstAlias } from "../frontmatter/utils";

export function getNoteDisplayLabel(app: App, file: TFile): string {
	const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
	const alias = resolveFirstAlias(frontmatter, file.basename);
	return alias === file.basename ? file.path : alias;
}

export class NotePathSuggest extends AbstractInputSuggest<TFile> {
	private textInputEl: HTMLInputElement;

	constructor(
		app: App,
		inputEl: HTMLInputElement,
		private onPick: (file: TFile) => void
	) {
		super(app, inputEl);
		this.textInputEl = inputEl;
		this.limit = 20;
	}

	getSuggestions(query: string): TFile[] {
		const files = this.app.vault.getMarkdownFiles();
		const trimmed = query.trim();

		if (!trimmed) {
			return [...files]
				.sort((a, b) => a.path.localeCompare(b.path))
				.slice(0, this.limit);
		}

		const fuzzy = prepareFuzzySearch(trimmed);
		const scored: Array<{ file: TFile; score: number }> = [];

		for (const file of files) {
			const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
			const alias = resolveFirstAlias(frontmatter, file.basename);
			const haystack = `${alias} ${file.basename} ${file.path}`;
			const match = fuzzy(haystack);
			if (match) {
				scored.push({ file, score: match.score });
			}
		}

		return scored
			.sort((a, b) => b.score - a.score)
			.slice(0, this.limit)
			.map((entry) => entry.file);
	}

	renderSuggestion(file: TFile, el: HTMLElement): void {
		const label = getNoteDisplayLabel(this.app, file);
		if (label === file.path) {
			el.setText(file.path);
			return;
		}

		el.empty();
		el.createDiv({ cls: "corvidae-note-suggest-title", text: label });
		el.createDiv({ cls: "corvidae-note-suggest-path", text: file.path });
	}

	selectSuggestion(file: TFile, _evt: MouseEvent | KeyboardEvent): void {
		this.setValue(getNoteDisplayLabel(this.app, file));
		this.textInputEl.dataset.notePath = file.path;
		this.onPick(file);
		this.close();
	}
}
