import type { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { MarkdownView } from "obsidian";
import {
	formatEuro,
	hasEuroMark,
	isCorvidaeFormula,
	isEmptyPlaceholder,
	isMergeMarker,
	parseAmount,
	parseFormulaKind,
	parseMergeKind,
} from "./parse";
import { applySideBySideTables } from "./layout";

const CELL_CLASS = "corvidae-table-cell";
const SRC_CLASS = "corvidae-table-src";
const DISPLAY_CLASS = "corvidae-table-display";
const MERGED_AWAY_CLASS = "corvidae-table-merged-away";
const MERGE_ANCHOR_CLASS = "corvidae-table-merge-anchor";
const UNKNOWN_FORMULA_DISPLAY = "#NAME?";

/**
 * Hard gate: only touch tables inside visible Reading View.
 * Edit / Live Preview (.markdown-source-view, .cm-*) → never mutate.
 */
function isEditableSurface(el: Element): boolean {
	return !!el.closest(
		".markdown-source-view, .cm-editor, .cm-table-widget, .cm-content, .cm-scroller"
	);
}

function isInReadingPreview(el: Element): boolean {
	if (isEditableSurface(el)) return false;
	return !!el.closest(".markdown-preview-view");
}

function getReadingPreviewEl(view: MarkdownView): HTMLElement | null {
	const el = view.containerEl.querySelector(".markdown-preview-view");
	return el?.instanceOf(HTMLElement) ? el : null;
}

function overlayHost(cell: HTMLTableCellElement): HTMLElement {
	// Live Preview wrappers must never be used — reading view has plain cells
	if (isEditableSurface(cell)) return cell;
	return cell;
}

function cellSourceText(host: HTMLElement): string {
	const src = host.querySelector(`:scope > .${SRC_CLASS}`);
	if (src) return (src.textContent ?? "").trim();
	return (host.textContent ?? "").trim();
}

function applyOverlay(host: HTMLElement, displayText: string): void {
	if (isEditableSurface(host)) return;

	const srcEl = host.querySelector(`:scope > .${SRC_CLASS}`);
	const displayEl = host.querySelector(`:scope > .${DISPLAY_CLASS}`);
	let src = srcEl?.instanceOf(HTMLElement) ? srcEl : null;
	let display = displayEl?.instanceOf(HTMLElement) ? displayEl : null;

	if (
		src &&
		display &&
		host.hasClass(CELL_CLASS) &&
		display.textContent === displayText
	) {
		return;
	}

	if (!src) {
		const previous = Array.from(host.childNodes);
		host.empty();
		src = host.createSpan({ cls: SRC_CLASS });
		for (const node of previous) {
			src.appendChild(node);
		}
		display = host.createSpan({ cls: DISPLAY_CLASS });
		host.addClass(CELL_CLASS);
	}

	if (!display) {
		display = host.createSpan({ cls: DISPLAY_CLASS });
		host.appendChild(display);
	}

	if (display.textContent !== displayText) {
		display.setText(displayText);
	}
}

function isHeaderCell(cell: HTMLTableCellElement): boolean {
	if (cell.tagName === "TH") return true;
	const row = cell.parentElement;
	if (!(row instanceof HTMLTableRowElement)) return false;
	const section = row.parentElement;
	return section instanceof HTMLTableSectionElement && section.tagName === "THEAD";
}

function tableRows(table: HTMLTableElement): HTMLTableRowElement[] {
	return Array.from(table.rows);
}

function resetMerges(table: HTMLTableElement): void {
	const rows = tableRows(table);
	for (const row of rows) {
		for (let c = 0; c < row.cells.length; c++) {
			const cell = row.cells[c];
			cell.removeClass(MERGED_AWAY_CLASS);
			cell.removeClass(MERGE_ANCHOR_CLASS);
			cell.removeAttribute("colspan");
			cell.removeAttribute("rowspan");
		}
	}
}

function findMergeLeftAnchor(
	row: HTMLTableRowElement,
	colIndex: number
): HTMLTableCellElement | null {
	for (let i = colIndex - 1; i >= 0; i--) {
		const cell = row.cells[i];
		if (!cell || cell.hasClass(MERGED_AWAY_CLASS)) continue;
		return cell;
	}
	return null;
}

function findMergeUpAnchor(
	rows: HTMLTableRowElement[],
	rowIndex: number,
	colIndex: number
): HTMLTableCellElement | null {
	for (let r = rowIndex - 1; r >= 0; r--) {
		const cell = rows[r]?.cells[colIndex];
		if (!cell || cell.hasClass(MERGED_AWAY_CLASS)) continue;
		return cell;
	}
	return null;
}

function applyMerges(table: HTMLTableElement): void {
	if (isEditableSurface(table)) return;
	resetMerges(table);
	const rows = tableRows(table);

	for (let r = 0; r < rows.length; r++) {
		const row = rows[r];
		for (let c = 0; c < row.cells.length; c++) {
			const cell = row.cells[c];
			const raw = cellSourceText(overlayHost(cell));
			const kind = parseMergeKind(raw);
			if (kind === null) continue;

			if (kind === "left") {
				const anchor = findMergeLeftAnchor(row, c);
				if (!anchor) continue;
				anchor.colSpan = (anchor.colSpan || 1) + 1;
				anchor.addClass(MERGE_ANCHOR_CLASS);
				cell.addClass(MERGED_AWAY_CLASS);
				continue;
			}

			const anchor = findMergeUpAnchor(rows, r, c);
			if (!anchor) continue;
			anchor.rowSpan = (anchor.rowSpan || 1) + 1;
			anchor.addClass(MERGE_ANCHOR_CLASS);
			cell.addClass(MERGED_AWAY_CLASS);
		}
	}
}

function sumColumnAbove(
	table: HTMLTableElement,
	rowIndex: number,
	colIndex: number
): number {
	let total = 0;
	const rows = tableRows(table);

	for (let i = 0; i < rowIndex; i++) {
		const row = rows[i];
		const cell = row.cells[colIndex];
		if (!cell || cell.hasClass(MERGED_AWAY_CLASS) || isHeaderCell(cell)) {
			continue;
		}
		const raw = cellSourceText(overlayHost(cell));
		if (
			isCorvidaeFormula(raw) ||
			isMergeMarker(raw) ||
			isEmptyPlaceholder(raw)
		) {
			continue;
		}
		const amount = parseAmount(raw);
		if (amount === null) continue;
		total += amount;
	}

	return total;
}

function enhanceFormulasAndEuro(table: HTMLTableElement): void {
	if (isEditableSurface(table)) return;
	const rows = tableRows(table);

	for (let r = 0; r < rows.length; r++) {
		const row = rows[r];
		for (let c = 0; c < row.cells.length; c++) {
			const cell = row.cells[c];
			if (cell.hasClass(MERGED_AWAY_CLASS)) continue;

			const host = overlayHost(cell);
			const raw = cellSourceText(host);
			if (!raw || isMergeMarker(raw)) continue;

			if (isEmptyPlaceholder(raw)) {
				cell.addClass("corvidae-table-empty-col");
				continue;
			}

			const formulaKind = parseFormulaKind(raw);
			if (formulaKind !== null) {
				if (isHeaderCell(cell)) continue;
				applyOverlay(
					host,
					formulaKind === "sum"
						? formatEuro(sumColumnAbove(table, r, c))
						: UNKNOWN_FORMULA_DISPLAY
				);
				continue;
			}

			if (hasEuroMark(raw)) {
				const amount = parseAmount(raw);
				if (amount === null) continue;
				applyOverlay(host, formatEuro(amount));
			}
		}
	}
}

function preserveEmptyCells(table: HTMLTableElement): void {
	if (isEditableSurface(table)) return;
	const rows = tableRows(table);
	for (const row of rows) {
		for (let c = 0; c < row.cells.length; c++) {
			const cell = row.cells[c];
			if (cell.hasClass(MERGED_AWAY_CLASS)) continue;
			if (cell.hasClass("corvidae-table-empty-col")) continue;

			const host = overlayHost(cell);
			if (host.querySelector(`:scope > .${DISPLAY_CLASS}`)) continue;

			const text = (host.textContent ?? "").replace(/\u00a0/g, " ").trim();
			if (text.length > 0) continue;
			if (host.querySelector("img, svg, video, iframe, input, br")) continue;

			if (!host.querySelector(":scope > .corvidae-table-empty-keep")) {
				host.empty();
				const keep = host.createSpan({ cls: "corvidae-table-empty-keep" });
				keep.setText("\u00a0");
			}
			cell.addClass("corvidae-table-empty-col");
		}
	}
}

function enhanceTable(table: HTMLTableElement): void {
	if (isEditableSurface(table)) return;
	if (!isInReadingPreview(table)) return;
	applyMerges(table);
	enhanceFormulasAndEuro(table);
	preserveEmptyCells(table);
}

function enhanceReadingPreview(preview: HTMLElement): void {
	if (isEditableSurface(preview)) return;
	if (!preview.classList.contains("markdown-preview-view")) {
		if (!preview.closest(".markdown-preview-view")) return;
	}
	applySideBySideTables(preview);
	const tables = preview.querySelectorAll("table");
	for (let i = 0; i < tables.length; i++) {
		const table = tables.item(i);
		if (!table?.instanceOf(HTMLTableElement)) continue;
		if (table.closest(".corvidae-html-embed")) continue;
		enhanceTable(table);
	}
}

let applying = false;
let lastMode: string | null = null;

function enhanceActiveReadingViews(plugin: Plugin): void {
	if (applying) return;
	applying = true;
	try {
		plugin.app.workspace.iterateAllLeaves((leaf) => {
			if (!(leaf.view instanceof MarkdownView)) return;
			// Edit / Live Preview: zero DOM writes
			if (leaf.view.getMode() !== "preview") return;

			const preview = getReadingPreviewEl(leaf.view);
			if (!preview) return;
			enhanceReadingPreview(preview);
		});
	} finally {
		applying = false;
	}
}

export function registerCorvidaeTableFormulas(plugin: Plugin): void {
	let timer: number | null = null;

	const scheduleReadingEnhance = (ms = 80): void => {
		const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view || view.getMode() !== "preview") return;

		if (timer !== null) window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			timer = null;
			enhanceActiveReadingViews(plugin);
		}, ms);
	};

	const onModeOrLayout = (): void => {
		const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
		const mode = view?.getMode?.() ?? null;

		if (mode === "preview") {
			// Entering / staying in Reading View
			scheduleReadingEnhance(mode !== lastMode ? 0 : 100);
			if (mode !== lastMode) {
				window.setTimeout(() => scheduleReadingEnhance(0), 120);
				window.setTimeout(() => scheduleReadingEnhance(0), 400);
			}
		}
		// Edit / Live Preview: do nothing — leave Obsidian tables alone
		lastMode = mode;
	};

	plugin.registerMarkdownPostProcessor(
		(el: HTMLElement, _ctx: MarkdownPostProcessorContext) => {
			// Live Preview / Edit post-process: ignore completely (no strip, no enhance)
			if (isEditableSurface(el) || !isInReadingPreview(el)) return;

			const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
			if (!view || view.getMode() !== "preview") return;

			const preview = el.closest(".markdown-preview-view");
			if (!(preview instanceof HTMLElement)) return;

			scheduleReadingEnhance(50);
		}
	);

	plugin.registerEvent(
		plugin.app.workspace.on("layout-change", onModeOrLayout)
	);
	plugin.registerEvent(
		plugin.app.workspace.on("active-leaf-change", onModeOrLayout)
	);
	plugin.registerEvent(
		plugin.app.workspace.on("file-open", () => {
			lastMode = null;
			onModeOrLayout();
		})
	);

	// Only observe while useful — handler no-ops in edit mode
	const observer = new MutationObserver(() => {
		const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view || view.getMode() !== "preview") return;
		scheduleReadingEnhance(150);
	});
	observer.observe(plugin.app.workspace.containerEl, {
		childList: true,
		subtree: true,
	});

	plugin.register(() => {
		observer.disconnect();
		if (timer !== null) window.clearTimeout(timer);
	});

	plugin.app.workspace.onLayoutReady(() => onModeOrLayout());
	onModeOrLayout();
}
