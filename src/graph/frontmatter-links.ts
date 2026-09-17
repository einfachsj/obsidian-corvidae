import type { App } from "obsidian";
import {
	normalizeLinkEntries,
	resolveLinkToPath,
} from "../hybrid-link/resolve";
import { LINK_PROPERTY } from "../properties/link";

/**
 * True when `sourcePath`'s frontmatter `link` property resolves to `destPath`.
 * Body wiki/embeds and other YAML fields do not count.
 */
export function isFrontmatterLinkPropertyEdge(
	app: App,
	sourcePath: string,
	destPath: string
): boolean {
	const meta = app.metadataCache.getCache(sourcePath);
	const entries = normalizeLinkEntries(meta?.frontmatter?.[LINK_PROPERTY]);
	if (entries.length === 0) return false;

	for (const entry of entries) {
		if (resolveLinkToPath(app, entry, sourcePath) === destPath) return true;
	}
	return false;
}
