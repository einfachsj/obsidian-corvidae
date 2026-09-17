import type { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { CorvidaeHtmlRenderChild } from "./render-child";

const LANGUAGE = "corvidaehtml";

export function registerCorvidaeHtmlCodeBlock(plugin: Plugin): void {
	plugin.registerMarkdownCodeBlockProcessor(
		LANGUAGE,
		(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			el.empty();
			ctx.addChild(new CorvidaeHtmlRenderChild(el, source));
		}
	);
}
