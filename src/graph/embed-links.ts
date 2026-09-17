import type { App, Reference } from "obsidian";

/** Extensions whose embed-only edges (`![[…]]`) are decoupled in the graph. */
export const DECOUPLE_EMBED_EXTS = [".base", ".canvas"] as const;

export type DecoupleEmbedExt = (typeof DECOUPLE_EMBED_EXTS)[number];

export function isDecoupleEmbedPath(path: string): boolean {
	return DECOUPLE_EMBED_EXTS.some((ext) => path.endsWith(ext));
}

/** Resolve a wiki/embed linkpath to a vault path, or null if unresolved. */
function resolveRefPath(
	app: App,
	sourcePath: string,
	ref: Reference | undefined
): string | null {
	if (!ref?.link) return null;
	const dest = app.metadataCache.getFirstLinkpathDest(ref.link, sourcePath);
	return dest?.path ?? null;
}

/**
 * True when `destPath` is a decoupled embed type (`.base` / `.canvas`) that
 * `sourcePath` embeds (`![[…]]`) but does not also reference via a normal
 * wikilink or frontmatter link.
 */
export function isEmbedOnlyDecoupledLink(
	app: App,
	sourcePath: string,
	destPath: string
): boolean {
	if (!isDecoupleEmbedPath(destPath)) return false;

	const meta = app.metadataCache.getCache(sourcePath);
	if (!meta) return false;

	let hasEmbed = false;
	for (const embed of meta.embeds ?? []) {
		if (resolveRefPath(app, sourcePath, embed) === destPath) {
			hasEmbed = true;
			break;
		}
	}
	if (!hasEmbed) return false;

	for (const link of meta.links ?? []) {
		if (resolveRefPath(app, sourcePath, link) === destPath) return false;
	}
	for (const link of meta.frontmatterLinks ?? []) {
		if (resolveRefPath(app, sourcePath, link) === destPath) return false;
	}

	return true;
}

/** @deprecated Use isEmbedOnlyDecoupledLink */
export const isEmbedOnlyBaseLink = isEmbedOnlyDecoupledLink;

/** True if either direction is an embed-only decoupled edge. */
export function isEmbedOnlyDecoupledEdge(
	app: App,
	pathA: string,
	pathB: string
): boolean {
	return (
		isEmbedOnlyDecoupledLink(app, pathA, pathB) ||
		isEmbedOnlyDecoupledLink(app, pathB, pathA)
	);
}

/** @deprecated Use isEmbedOnlyDecoupledEdge */
export const isEmbedOnlyBaseEdge = isEmbedOnlyDecoupledEdge;
