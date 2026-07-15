/** Frontmatter-Farbwert (#rrggbb) in PixiJS-Zahl (0xRRGGBB) */
export function hexToPixi(hex: string): number | null {
	const cleaned = hex.trim().replace(/^#/, "");
	if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
	return parseInt(cleaned, 16);
}

/** PixiJS-Zahl oder Hex-String in normalisiertes CSS-Hex (#rrggbb) */
export function normalizeHexColor(value: unknown): string | null {
	if (typeof value === "number" && Number.isFinite(value)) {
		return `#${value.toString(16).padStart(6, "0")}`;
	}
	if (typeof value !== "string") return null;

	const trimmed = value.trim();
	if (!trimmed) return null;

	const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
	const cleaned = withHash.replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;

	return `#${cleaned.toLowerCase()}`;
}

/** Frontmatter-size in gültigen Bereich clampen */
export function parseSize(
	value: unknown,
	minSize: number,
	maxSize: number
): number | null {
	if (value === undefined || value === null || value === "") return null;

	const num = typeof value === "number" ? value : parseFloat(String(value));
	if (isNaN(num)) return null;

	return Math.min(maxSize, Math.max(minSize, num));
}

/** Ersten Alias aus Frontmatter, sonst Fallback (z. B. Dateiname) */
export function resolveFirstAlias(
	frontmatter: Record<string, unknown> | undefined,
	fallback: string
): string {
	const aliases = frontmatter?.aliases;

	if (Array.isArray(aliases) && aliases.length > 0) {
		const first = aliases[0];
		if (first !== undefined && first !== null && String(first).trim()) {
			return String(first).trim();
		}
	}

	if (typeof aliases === "string" && aliases.trim()) {
		return aliases.trim();
	}

	return fallback;
}
