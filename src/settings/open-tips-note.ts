import { App, Notice } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import { ensureTipsNote, TIPS_VAULT_PATH } from "./tips-asset";

export async function openTipsNote(app: App, _plugin: CorvidaePlugin): Promise<void> {
	const file = await ensureTipsNote(app);
	if (!file) {
		new Notice(t("settings.tips.notice.error"));
		return;
	}

	const leaf = app.workspace.getLeaf("tab");
	await leaf.openFile(file);
	new Notice(t("settings.tips.notice.opened"));
}

export { TIPS_VAULT_PATH };
