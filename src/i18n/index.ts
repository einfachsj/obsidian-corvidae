import { de } from "./de";
import { en } from "./en";
import type {
	CorvidaeLanguageSetting,
	CorvidaeLocale,
	TranslationKey,
} from "./types";

export type {
	CorvidaeLanguageSetting,
	CorvidaeLocale,
	TranslationCatalog,
	TranslationKey,
} from "./types";

const catalogs = { en, de } as const;

let getLanguageSetting: () => CorvidaeLanguageSetting = () => "auto";

export function initI18n(getter: () => CorvidaeLanguageSetting): void {
	getLanguageSetting = getter;
}

export function detectObsidianLocale(): CorvidaeLocale {
	const newFolderButton = document.querySelector(
		'.nav-action-button[aria-label="Neuer Ordner"]'
	);
	return newFolderButton ? "de" : "en";
}

export function resolveLocale(setting: CorvidaeLanguageSetting): CorvidaeLocale {
	if (setting === "auto") return detectObsidianLocale();
	return setting;
}

export function t(key: TranslationKey, setting?: CorvidaeLanguageSetting): string {
	const locale = resolveLocale(setting ?? getLanguageSetting());
	return catalogs[locale][key] ?? catalogs.en[key];
}

export function getExplorerTagLabel(
	tag: "NOTE" | "DRAW" | "FOLDER" | "HYBRID",
	setting?: CorvidaeLanguageSetting
): string {
	switch (tag) {
		case "NOTE":
			return t("explorer.tag.note", setting);
		case "DRAW":
			return t("explorer.tag.draw", setting);
		case "FOLDER":
			return t("explorer.tag.folder", setting);
		case "HYBRID":
			return t("explorer.tag.hybrid", setting);
	}
}
