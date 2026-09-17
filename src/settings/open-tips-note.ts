import { App, Notice } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import { readTipsContent } from "./tips-asset";
import { CORVIDAE_TIPS_VIEW } from "./tips-view";

export async function openTipsNote(app: App, plugin: CorvidaePlugin): Promise<void> {
	const content = await readTipsContent(app, plugin);
	if (content === null) {
		new Notice(t("settings.tips.notice.error"));
		return;
	}

	const existing = app.workspace.getLeavesOfType(CORVIDAE_TIPS_VIEW);
	if (existing.length > 0) {
		await app.workspace.revealLeaf(existing[0]);
		new Notice(t("settings.tips.notice.opened"));
		return;
	}

	const leaf = app.workspace.getLeaf("tab");
	await leaf.setViewState({
		type: CORVIDAE_TIPS_VIEW,
		active: true,
	});
	new Notice(t("settings.tips.notice.opened"));
}
