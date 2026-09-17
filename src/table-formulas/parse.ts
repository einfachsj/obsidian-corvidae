/** Any cell starting with `=` is a Corvidae formula (after stripping markdown wrappers). */
const FORMULA_PREFIX = "=";

/** SUM / SUMME — column above; optional ABOVE / OBERHALB; parentheses optional. */
const SUM_FORMULA_RE =
	/^=\s*(SUM|SUMME)\s*(?:\(\s*(ABOVE|OBERHALB)?\s*\))?\s*$/i;

/** Merge into cell to the left (colspan). Whole cell must be exactly the marker — never empty cells. */
const MERGE_LEFT_RE = /^(?:<<|«)$/;

/** Merge into cell above (rowspan). Whole cell must be exactly the marker — never empty cells. */
const MERGE_UP_RE = /^(?:\^\^|↑)$/;

const EURO_MARK_RE = /€|EUR/i;

/** Intentional empty column/cell placeholder: `-`, `---`, en/em dash, etc. */
const EMPTY_PLACEHOLDER_RE = /^[-–—−]+$/;

/** Unwrap **bold**, _em_, `code` so `**=SUMME()**` still matches. */
export function stripCellMarkup(raw: string): string {
	let s = raw.trim();
	for (let i = 0; i < 4; i++) {
		const next = s
			.replace(/^\*{1,3}([\s\S]+?)\*{1,3}$/, "$1")
			.replace(/^_{1,2}([\s\S]+?)_{1,2}$/, "$1")
			.replace(/^`+([\s\S]+?)`+$/, "$1")
			.trim();
		if (next === s) break;
		s = next;
	}
	return s;
}

const euroFormatter = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});

export type FormulaKind = "sum" | "unknown";
export type MergeKind = "left" | "up";

export function isCorvidaeFormula(raw: string): boolean {
	return stripCellMarkup(raw).startsWith(FORMULA_PREFIX);
}

export function isEmptyPlaceholder(raw: string): boolean {
	const s = stripCellMarkup(raw);
	return s.length > 0 && EMPTY_PLACEHOLDER_RE.test(s);
}

export function parseMergeKind(raw: string): MergeKind | null {
	const s = stripCellMarkup(raw);
	// Empty / whitespace-only / `-` placeholders are NEVER merge markers
	if (!s || isEmptyPlaceholder(s)) return null;
	if (MERGE_LEFT_RE.test(s)) return "left";
	if (MERGE_UP_RE.test(s)) return "up";
	return null;
}

export function isMergeMarker(raw: string): boolean {
	return parseMergeKind(raw) !== null;
}

export function parseFormulaKind(raw: string): FormulaKind | null {
	const s = stripCellMarkup(raw);
	if (!s.startsWith(FORMULA_PREFIX)) return null;
	if (SUM_FORMULA_RE.test(s)) return "sum";
	return "unknown";
}

/** @deprecated Prefer isCorvidaeFormula / parseFormulaKind */
export function isSumFormula(raw: string): boolean {
	return parseFormulaKind(raw) === "sum";
}

export function hasEuroMark(raw: string): boolean {
	return EURO_MARK_RE.test(raw);
}

export function formatEuro(value: number): string {
	return euroFormatter.format(value);
}

export function parseAmount(raw: string): number | null {
	const trimmed = stripCellMarkup(raw);
	if (
		!trimmed ||
		isCorvidaeFormula(trimmed) ||
		isMergeMarker(trimmed) ||
		isEmptyPlaceholder(trimmed)
	) {
		return null;
	}

	let s = trimmed
		.replace(/EUR/gi, "")
		.replace(/€/g, "")
		.replace(/\u00a0/g, "")
		.replace(/\s/g, "");

	if (!s) return null;

	// Lone minus already handled by isEmptyPlaceholder; reject bare sign
	let sign = 1;
	if (s.startsWith("+")) {
		s = s.slice(1);
	} else if (s.startsWith("-")) {
		sign = -1;
		s = s.slice(1);
	}

	if (!s || EMPTY_PLACEHOLDER_RE.test(s)) return null;

	const lastComma = s.lastIndexOf(",");
	const lastDot = s.lastIndexOf(".");
	let normalized = s;

	if (lastComma >= 0 && lastDot >= 0) {
		if (lastComma > lastDot) {
			normalized = s.replace(/\./g, "").replace(",", ".");
		} else {
			normalized = s.replace(/,/g, "");
		}
	} else if (lastComma >= 0) {
		const frac = s.length - lastComma - 1;
		if (frac === 1 || frac === 2) {
			normalized = s.replace(",", ".");
		} else {
			normalized = s.replace(/,/g, "");
		}
	} else if (lastDot >= 0) {
		const frac = s.length - lastDot - 1;
		if (frac !== 1 && frac !== 2) {
			normalized = s.replace(/\./g, "");
		}
	}

	if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
	const n = Number(normalized) * sign;
	return Number.isFinite(n) ? n : null;
}
