import { App, TFile, TFolder, WorkspaceLeaf } from "obsidian";
import { isFolderNotePath } from "../folder-note";
import { compareExplorerPaths } from "./sort";

const ORIGINAL_METHOD = Symbol("corvidae-original-getSortedFolderItems");

interface FileExplorerItem {
	file?: { path: string };
}

interface FileExplorerViewLike {
	getSortedFolderItems(folder: TFolder): FileExplorerItem[];
	requestSort?(): void;
	infinityScroll?: { invalidate?: () => void };
}

type GetSortedFolderItemsFn = (
	this: FileExplorerViewLike,
	folder: TFolder
) => FileExplorerItem[];

export class FileExplorerAliasSortPatch {
	private uninstall: (() => void) | null = null;
	private sortRefreshTimer: number | null = null;

	constructor(
		private app: App,
		private shouldHideFolderNotes: () => boolean
	) {}

	install(): boolean {
		if (this.uninstall) return true;

		const leaf = this.getFileExplorerLeaf();
		if (!leaf?.view || leaf.isDeferred) return false;

		const proto = Object.getPrototypeOf(leaf.view) as FileExplorerViewLike &
			Record<symbol, GetSortedFolderItemsFn>;
		const original = proto.getSortedFolderItems;
		if (typeof original !== "function" || ORIGINAL_METHOD in proto) {
			return false;
		}

		const app = this.app;
		const shouldHideFolderNotes = this.shouldHideFolderNotes;

		proto[ORIGINAL_METHOD] = original;
		proto.getSortedFolderItems = function (
			this: FileExplorerViewLike,
			folder: TFolder
		): FileExplorerItem[] {
			const items = original.call(this, folder) ?? [];
			const filtered = items.filter((item) => {
				const path = item?.file?.path;
				if (!path) return true;
				return !(
					shouldHideFolderNotes() &&
					isFolderNotePath(path)
				);
			});

			filtered.sort((a, b) => {
				const pathA = a?.file?.path ?? "";
				const pathB = b?.file?.path ?? "";
				return compareExplorerPaths(app, pathA, pathB);
			});

			return filtered;
		};

		this.uninstall = () => {
			if (ORIGINAL_METHOD in proto) {
				proto.getSortedFolderItems = proto[ORIGINAL_METHOD];
				delete proto[ORIGINAL_METHOD];
			}
			this.uninstall = null;
		};

		return true;
	}

	uninstallPatch(): void {
		this.uninstall?.();
		if (this.sortRefreshTimer !== null) {
			window.clearTimeout(this.sortRefreshTimer);
			this.sortRefreshTimer = null;
		}
	}

	scheduleSortRefresh(): void {
		if (this.sortRefreshTimer !== null) {
			window.clearTimeout(this.sortRefreshTimer);
		}

		this.sortRefreshTimer = window.setTimeout(() => {
			this.sortRefreshTimer = null;
			void this.refreshExplorerSort();
		}, 200);
	}

	async refreshExplorerSort(): Promise<void> {
		await this.ensureFileExplorerReady();
		this.install();
		this.requestSort();
		window.setTimeout(() => this.requestSort(), 100);
	}

	tryInstallAndSort(): void {
		void this.refreshExplorerSort();
	}

	requestSort(): void {
		for (const leaf of this.app.workspace.getLeavesOfType("file-explorer")) {
			if (leaf.isDeferred) continue;
			const view = leaf.view as unknown as FileExplorerViewLike | undefined;
			view?.requestSort?.();
			view?.infinityScroll?.invalidate?.();
		}
	}

	private async ensureFileExplorerReady(): Promise<void> {
		for (const leaf of this.app.workspace.getLeavesOfType("file-explorer")) {
			if (leaf.isDeferred) {
				await leaf.loadIfDeferred();
			}
		}
	}

	private getFileExplorerLeaf(): WorkspaceLeaf | undefined {
		return this.app.workspace.getLeavesOfType("file-explorer")[0];
	}
}
