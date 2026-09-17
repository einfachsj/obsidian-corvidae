/**
 * Entwicklungsordner: sichtbarer Container; direkte Kinder sichtbar aber versiegelt;
 * alles darunter im Explorer ausgeblendet.
 */

export function normalizeFolderPath(path: string): string {
	return path.replace(/^\/+|\/+$/g, "");
}

export function isDevelopmentFolder(
	path: string,
	folders: readonly string[]
): boolean {
	const normalized = normalizeFolderPath(path);
	if (!normalized) return false;
	return folders.some((folder) => normalizeFolderPath(folder) === normalized);
}

/** Direkter Kind-Ordner eines Entwicklungsordners (z.B. CURSOR/projekt). */
export function isSealedDevelopmentChild(
	path: string,
	folders: readonly string[]
): boolean {
	const normalized = normalizeFolderPath(path);
	if (!normalized) return false;

	for (const folder of folders) {
		const dev = normalizeFolderPath(folder);
		if (!dev || normalized === dev) continue;
		if (!normalized.startsWith(`${dev}/`)) continue;
		const rest = normalized.slice(dev.length + 1);
		if (rest.length > 0 && !rest.includes("/")) return true;
	}
	return false;
}

/** Tiefer als ein Level unter einem Entwicklungsordner (z.B. CURSOR/projekt/src). */
export function isInsideSealedDevelopmentContent(
	path: string,
	folders: readonly string[]
): boolean {
	const normalized = normalizeFolderPath(path);
	if (!normalized) return false;

	for (const folder of folders) {
		const dev = normalizeFolderPath(folder);
		if (!dev) continue;
		if (!normalized.startsWith(`${dev}/`)) continue;
		const rest = normalized.slice(dev.length + 1);
		if (rest.includes("/")) return true;
	}
	return false;
}

/** Ordner, deren Kinder im Explorer nicht gelistet werden. */
export function shouldCollapseExplorerFolder(
	folderPath: string,
	folders: readonly string[]
): boolean {
	return (
		isSealedDevelopmentChild(folderPath, folders) ||
		isInsideSealedDevelopmentContent(folderPath, folders)
	);
}
