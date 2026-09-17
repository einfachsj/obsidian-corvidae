import type { App, TFile } from "obsidian";
import { TIPS_MARKDOWN, TIPS_VAULT_PATH } from "./tips-content";

export { TIPS_MARKDOWN, TIPS_VAULT_PATH };

export function getTipsMarkdown(): string {
	return TIPS_MARKDOWN;
}

/**
 * Create or update vault-root CORVIDAE.md from the bundled tips markdown.
 */
export async function ensureTipsNote(app: App): Promise<TFile | null> {
	const content = getTipsMarkdown();
	const existing = app.vault.getFileByPath(TIPS_VAULT_PATH);
	if (existing) {
		const current = await app.vault.read(existing);
		if (current !== content) {
			await app.vault.modify(existing, content);
		}
		return existing;
	}

	try {
		return await app.vault.create(TIPS_VAULT_PATH, content);
	} catch {
		const again = app.vault.getFileByPath(TIPS_VAULT_PATH);
		return again;
	}
}
