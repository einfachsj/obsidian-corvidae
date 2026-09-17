import { normalizePath } from "obsidian";
import { normalizeFolderPath } from "../explorer/development-folders";

export const DEV_MD_BASENAME = "dev.md";

export function getDevMdPath(folder: string): string {
	const root = normalizeFolderPath(folder);
	return normalizePath(`${root}/${DEV_MD_BASENAME}`);
}

export function isDevMdPath(path: string, folder: string): boolean {
	const root = normalizeFolderPath(folder);
	if (!root) return false;
	return normalizePath(path) === getDevMdPath(root);
}

/**
 * Projektordner + optionaler Code-Ordner → Scan-Wurzel für Knoten.
 */
export function resolveCodeScanRoot(folder: string, codeFolder: string): string {
	const root = normalizeFolderPath(folder);
	if (!root) return "";

	const code = normalizeFolderPath(codeFolder);
	if (!code) return root;
	if (code === root || code.startsWith(`${root}/`)) return code;
	return normalizeFolderPath(`${root}/${code}`);
}
