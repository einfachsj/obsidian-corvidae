/**
 * Pfad-Hilfen für das Folder-Note-Muster: Parent/Name/Name.md
 */

import { App, TFile, TFolder } from "obsidian";

/** Pfad entspricht …/Name/Name.md */
export function isFolderNotePath(path: string): boolean {
	const slash = path.lastIndexOf("/");
	if (slash === -1) return false;

	const fileName = path.slice(slash + 1);
	if (!fileName.endsWith(".md")) return false;

	const base = fileName.slice(0, -3);
	const folderName = path.slice(0, slash).split("/").pop() ?? "";
	return folderName === base;
}

/** Ordnerpfad aus einer Folder-Note (…/Name) */
export function folderPathFromNotePath(notePath: string): string {
	return notePath.slice(0, notePath.lastIndexOf("/"));
}

/** Erwarteter Notizpfad für einen Ordner */
export function notePathForFolder(folderPath: string, folderName: string): string {
	return folderPath ? `${folderPath}/${folderName}.md` : `${folderName}.md`;
}

/** Folder-Note zu einem Ordner (Name/Name.md) */
export function getFolderNoteForFolder(
	app: App,
	folder: TFolder
): TFile | null {
	const notePath = notePathForFolder(folder.path, folder.name);
	if (!isFolderNotePath(notePath)) return null;

	const file = app.vault.getAbstractFileByPath(notePath);
	return file instanceof TFile ? file : null;
}

/** Datei liegt in einem Folder-Note-Ordner (Geschwister der versteckten Name/Name.md) */
export function isInsideFolderNoteFolder(app: App, file: TFile): boolean {
	const parent = file.parent;
	if (!(parent instanceof TFolder) || parent.path === "") return false;
	return getFolderNoteForFolder(app, parent) !== null;
}

/** Eindeutigen Zielpfad ermitteln – bei Kollision: Name 1/Name 1.md */
export function resolveUniqueFolderNotePath(
	exists: (path: string) => boolean,
	parentPath: string,
	baseName: string
): { folderPath: string; notePath: string } {
	let name = baseName;
	let counter = 0;

	while (true) {
		const folderPath = parentPath ? `${parentPath}/${name}` : name;
		const notePath = notePathForFolder(folderPath, name);
		if (!exists(folderPath) && !exists(notePath)) {
			return { folderPath, notePath };
		}
		counter++;
		name = `${baseName} ${counter}`;
	}
}
