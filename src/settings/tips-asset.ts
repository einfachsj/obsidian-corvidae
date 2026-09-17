import type { App } from "obsidian";
import type CorvidaePlugin from "../main";

export const TIPS_FILE = "CORVIDAE PLUGIN.md";
const TIPS_SOURCE_FALLBACK = `ORGANISATION/CORVIDAE PLUGIN/${TIPS_FILE}`;

export function getTipsAssetPath(plugin: CorvidaePlugin): string | null {
	const pluginDir = plugin.manifest.dir;
	if (!pluginDir) return null;
	return `${pluginDir}/${TIPS_FILE}`;
}

export async function readTipsContent(
	app: App,
	plugin: CorvidaePlugin
): Promise<string | null> {
	const assetPath = getTipsAssetPath(plugin);
	if (assetPath) {
		try {
			if (await app.vault.adapter.exists(assetPath)) {
				return await app.vault.adapter.read(assetPath);
			}
		} catch {
			/* fall through */
		}
	}

	const fallback = app.vault.getFileByPath(TIPS_SOURCE_FALLBACK);
	if (fallback) {
		try {
			return await app.vault.read(fallback);
		} catch {
			return null;
		}
	}

	return null;
}
