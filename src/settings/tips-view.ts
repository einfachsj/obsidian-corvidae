import { ItemView, MarkdownRenderer, WorkspaceLeaf } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";
import { getTipsAssetPath, readTipsContent, TIPS_FILE } from "./tips-asset";

export const CORVIDAE_TIPS_VIEW = "corvidae-tips";

function stripFrontmatter(markdown: string): string {
	if (!markdown.startsWith("---\n") && !markdown.startsWith("---\r\n")) {
		return markdown;
	}
	const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
	if (!match) return markdown;
	return markdown.slice(match[0].length);
}

export class CorvidaeTipsView extends ItemView {
	private plugin: CorvidaePlugin;
	private previewEl!: HTMLElement;

	constructor(leaf: WorkspaceLeaf, plugin: CorvidaePlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return CORVIDAE_TIPS_VIEW;
	}

	getDisplayText(): string {
		return t("settings.tips.viewTitle");
	}

	getIcon(): string {
		return "info";
	}

	async onOpen(): Promise<void> {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("corvidae-tips-view");
		this.previewEl = contentEl.createDiv({
			cls: "markdown-preview-view markdown-rendered corvidae-tips-preview",
		});
		await this.renderTips();
	}

	async onClose(): Promise<void> {
		this.contentEl.empty();
	}

	private async renderTips(): Promise<void> {
		this.previewEl.empty();

		const content = await readTipsContent(this.app, this.plugin);
		if (content === null) {
			this.previewEl.createEl("p", {
				cls: "corvidae-tips-error",
				text: t("settings.tips.notice.error"),
			});
			return;
		}

		const sourcePath =
			getTipsAssetPath(this.plugin) ?? `${this.plugin.manifest.dir}/${TIPS_FILE}`;

		await MarkdownRenderer.render(
			this.app,
			stripFrontmatter(content),
			this.previewEl,
			sourcePath,
			this
		);
	}
}
