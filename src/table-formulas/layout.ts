const SIDE_CLASS = "corvidae-tables-side";
const SIDE_COL_CLASS = "corvidae-tables-side-col";
const SIDE_ITEM_CLASS = "corvidae-tables-side-item";
const SIDE_GAP_CLASS = "corvidae-tables-side-gap";
const SIDE_CLEAR_CLASS = "corvidae-tables-side-clear";

const SIDE_GAP_PX = 8;

function isEmptyFlowGap(el: Element): boolean {
	if (!(el instanceof HTMLElement)) return true;
	if (el.classList.contains(SIDE_CLEAR_CLASS)) return true;
	if (el.classList.contains(SIDE_CLASS)) return false;
	if (el.classList.contains(SIDE_COL_CLASS)) return false;
	if (el.classList.contains(SIDE_ITEM_CLASS)) return false;
	if (el.classList.contains("el-table")) return false;

	const tag = el.tagName;
	if (tag === "BR" || tag === "HR") return true;

	if (
		el.classList.contains("el-p") ||
		tag === "P" ||
		tag === "DIV" ||
		tag === "SPAN"
	) {
		if (
			el.querySelector(
				"table, img, video, iframe, pre, .el-table, ul, ol, blockquote"
			)
		) {
			return false;
		}
		return !(el.textContent ?? "").trim();
	}

	return false;
}

function isTableBlock(el: HTMLElement): boolean {
	if (el.classList.contains("el-table")) return true;
	if (el.tagName === "TABLE") return true;
	return (
		el.children.length === 1 &&
		el.children[0] instanceof HTMLTableElement &&
		!el.classList.contains("markdown-preview-sizer")
	);
}

/** Heading or short title paragraph directly above a table (e.g. **Mietwohnung**). */
function isColumnTitleBlock(el: HTMLElement): boolean {
	if (/^H[1-6]$/.test(el.tagName)) return true;
	for (let i = 1; i <= 6; i++) {
		if (el.classList.contains(`el-h${i}`)) return true;
	}
	if (
		el.querySelector(
			":scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6"
		)
	) {
		return true;
	}

	if (el.classList.contains("el-p") || el.tagName === "P") {
		if (
			el.querySelector("table, ul, ol, pre, blockquote, .el-table, p, div")
		) {
			return false;
		}
		const text = (el.textContent ?? "").trim();
		if (!text) return false;
		// Dash placeholders are empty columns, not titles above tables
		if (/^[-–—−]+$/.test(text)) return false;
		if (text.length > 100) return false;
		if (text.includes("\n")) return false;
		return true;
	}

	return false;
}

function clearItemStyles(el: HTMLElement): void {
	el.removeClass(SIDE_ITEM_CLASS);
	el.style.removeProperty("width");
	el.style.removeProperty("max-width");
	el.style.removeProperty("margin-right");
	el.style.removeProperty("flex");
	el.style.removeProperty("min-width");
	el.style.removeProperty("display");
	el.style.removeProperty("vertical-align");
	el.style.removeProperty("box-sizing");
}

function unwrapLegacyRows(root: ParentNode): void {
	const scope = root instanceof Element ? root : null;
	const q = (sel: string): NodeListOf<Element> =>
		scope
			? scope.querySelectorAll(sel)
			: (root as Document).querySelectorAll?.(sel) ?? [];

	q(`.${SIDE_COL_CLASS}`).forEach((col) => {
		if (!(col instanceof HTMLElement)) return;
		const parent = col.parentElement;
		if (!parent) return;
		while (col.firstChild) {
			const child = col.firstChild;
			if (child instanceof HTMLElement) clearItemStyles(child);
			parent.insertBefore(child, col);
		}
		col.remove();
	});

	q(`.${SIDE_CLASS}`).forEach((side) => {
		if (!(side instanceof HTMLElement)) return;
		const parent = side.parentElement;
		if (!parent) return;
		while (side.firstChild) {
			const child = side.firstChild;
			if (child instanceof HTMLElement) {
				if (child.classList.contains(SIDE_COL_CLASS)) {
					while (child.firstChild) {
						const inner = child.firstChild;
						if (inner instanceof HTMLElement) clearItemStyles(inner);
						parent.insertBefore(inner, side);
					}
					child.remove();
				} else {
					clearItemStyles(child);
					parent.insertBefore(child, side);
				}
			} else {
				parent.insertBefore(child, side);
			}
		}
		side.remove();
	});

	q(`.${SIDE_CLEAR_CLASS}`).forEach((el) => el.remove());
	q(`.${SIDE_GAP_CLASS}`).forEach((el) => {
		if (el instanceof HTMLElement) el.removeClass(SIDE_GAP_CLASS);
	});
	q(`.${SIDE_ITEM_CLASS}`).forEach((el) => {
		if (el instanceof HTMLElement) clearItemStyles(el);
	});
}

interface ColumnSpec {
	blocks: HTMLElement[];
	gaps: HTMLElement[];
}

function parseColumn(
	children: HTMLElement[],
	start: number
): { col: ColumnSpec; next: number } | null {
	let i = start;
	const gaps: HTMLElement[] = [];
	const blocks: HTMLElement[] = [];

	while (i < children.length && isEmptyFlowGap(children[i])) {
		gaps.push(children[i]);
		i++;
	}

	if (i >= children.length) return null;

	if (isColumnTitleBlock(children[i])) {
		blocks.push(children[i]);
		i++;
		while (i < children.length && isEmptyFlowGap(children[i])) {
			gaps.push(children[i]);
			i++;
		}
	}

	if (i >= children.length || !isTableBlock(children[i])) {
		return null;
	}

	blocks.push(children[i]);
	i++;
	return { col: { blocks, gaps }, next: i };
}

function applyColumns(columns: ColumnSpec[]): void {
	if (columns.length < 2) return;

	const firstBlock = columns[0].blocks[0];
	const parent = firstBlock.parentElement;
	if (!parent) return;

	if (parent.classList.contains(SIDE_CLASS)) return;

	const row = parent.createDiv({ cls: SIDE_CLASS });
	row.style.setProperty("gap", `${SIDE_GAP_PX}px`);
	parent.insertBefore(row, firstBlock);

	for (const col of columns) {
		for (const gap of col.gaps) {
			gap.addClass(SIDE_GAP_CLASS);
		}

		const colEl = row.createDiv({ cls: SIDE_COL_CLASS });
		for (const block of col.blocks) {
			block.addClass(SIDE_ITEM_CLASS);
			colEl.appendChild(block);
		}
	}
}

function layoutPreviewSizer(sizer: HTMLElement): void {
	const children = Array.from(sizer.children).filter(
		(c): c is HTMLElement =>
			c instanceof HTMLElement &&
			!c.classList.contains(SIDE_CLEAR_CLASS)
	);

	let i = 0;
	while (i < children.length) {
		if (children[i].classList.contains(SIDE_CLASS)) {
			i++;
			continue;
		}

		const columns: ColumnSpec[] = [];
		let cursor = i;
		let parsed = parseColumn(children, cursor);

		while (parsed) {
			columns.push(parsed.col);
			cursor = parsed.next;

			while (cursor < children.length && isEmptyFlowGap(children[cursor])) {
				columns[columns.length - 1].gaps.push(children[cursor]);
				cursor++;
			}

			parsed = parseColumn(children, cursor);
		}

		if (columns.length >= 2) {
			applyColumns(columns);
			// Refresh children after DOM move
			return layoutPreviewSizer(sizer);
		}

		i++;
	}
}

/**
 * Reading View: 2+ consecutive tables (optional title/heading above each)
 * → flex row so many tables sit side by side with 8px gap.
 */
export function applySideBySideTables(root: ParentNode): void {
	unwrapLegacyRows(root);

	const sizers: HTMLElement[] = [];

	if (root instanceof HTMLElement) {
		if (
			root.classList.contains("markdown-preview-sizer") &&
			root.closest(".markdown-preview-view") &&
			!root.closest(".markdown-source-view, .cm-editor")
		) {
			sizers.push(root);
		}
		root
			.querySelectorAll(".markdown-preview-view .markdown-preview-sizer")
			.forEach((el) => {
				if (!(el instanceof HTMLElement)) return;
				if (el.closest(".markdown-source-view, .cm-editor")) return;
				sizers.push(el);
			});
	}

	const seen = new Set<HTMLElement>();
	for (const sizer of sizers) {
		if (seen.has(sizer)) continue;
		seen.add(sizer);
		layoutPreviewSizer(sizer);
	}
}

export {
	SIDE_CLASS,
	SIDE_COL_CLASS,
	SIDE_ITEM_CLASS,
	SIDE_GAP_CLASS,
	SIDE_CLEAR_CLASS,
	SIDE_GAP_PX,
};
