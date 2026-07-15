import {
	AbstractInputSuggest,
	App,
	prepareFuzzySearch,
	TFolder,
} from "obsidian";

function collectFolders(app: App): TFolder[] {
	const folders: TFolder[] = [];
	const root = app.vault.getRoot();
	const walk = (folder: TFolder): void => {
		folders.push(folder);
		for (const child of folder.children) {
			if (child instanceof TFolder) walk(child);
		}
	};
	walk(root);
	return folders;
}

export class FolderPathSuggest extends AbstractInputSuggest<TFolder> {
	constructor(
		app: App,
		inputEl: HTMLInputElement,
		private onPick: (folder: TFolder) => void
	) {
		super(app, inputEl);
		this.limit = 20;
	}

	getSuggestions(query: string): TFolder[] {
		const folders = collectFolders(this.app);
		const trimmed = query.trim();

		if (!trimmed) {
			return folders
				.filter((folder) => folder.path !== "")
				.sort((a, b) => a.path.localeCompare(b.path))
				.slice(0, this.limit);
		}

		const fuzzy = prepareFuzzySearch(trimmed);
		const scored: Array<{ folder: TFolder; score: number }> = [];

		for (const folder of folders) {
			if (folder.path === "") continue;
			const haystack = `${folder.name} ${folder.path}`;
			const match = fuzzy(haystack);
			if (match) {
				scored.push({ folder, score: match.score });
			}
		}

		return scored
			.sort((a, b) => b.score - a.score)
			.slice(0, this.limit)
			.map((entry) => entry.folder);
	}

	renderSuggestion(folder: TFolder, el: HTMLElement): void {
		el.empty();
		el.createDiv({ cls: "corvidae-folder-suggest-title", text: folder.name });
		el.createDiv({ cls: "corvidae-folder-suggest-path", text: folder.path });
	}

	selectSuggestion(folder: TFolder, _evt: MouseEvent | KeyboardEvent): void {
		this.setValue(folder.path);
		this.onPick(folder);
		this.close();
	}
}
