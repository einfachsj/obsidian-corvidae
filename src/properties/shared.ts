export interface PropertyRenderContext {
	key: string;
	onChange: (value: unknown) => void;
	blur: () => void;
}

export interface PropertyWidgetLike {
	type: string;
	icon: string;
	reservedKeys?: string[];
	default: () => unknown;
	name: () => string;
	validate: (value: unknown) => boolean;
	render: (
		containerEl: HTMLElement,
		data: unknown,
		context: PropertyRenderContext
	) => unknown;
}

export interface MetadataTypeManagerLike {
	registeredTypeWidgets: Record<string, PropertyWidgetLike>;
	setType: (property: string, type: string) => void;
	save?: () => Promise<void>;
}

export const WIKILINK_PATTERN = /^\[\[[^\]]+\]\]$/;

export function isWikiLinkString(value: unknown): boolean {
	if (typeof value !== "string") return false;
	const trimmed = value.trim();
	return trimmed.length > 0 && WIKILINK_PATTERN.test(trimmed);
}

export function validateLinkPropertyValue(value: unknown): boolean {
	if (value === null || value === undefined || value === "") return true;
	if (typeof value === "string") return isWikiLinkString(value);
	if (Array.isArray(value)) {
		return value.every((item) => isWikiLinkString(item));
	}
	return false;
}
