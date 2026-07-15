/**
 * Custom Property-Typen: graph (size/color), link (WikiLink-Liste).
 */

import type { App } from "obsidian";
import { t } from "../i18n";
import type { CorvidaeSettings } from "../settings";
import { registerLinkPropertyType } from "./link";
import type { MetadataTypeManagerLike, PropertyWidgetLike } from "./shared";

const GRAPH_TYPE = "graph";

export function registerCorvidaePropertyTypes(
	app: App,
	settings: CorvidaeSettings
): void {
	try {
		// @ts-expect-error – interne Obsidian-API
		const manager = app.metadataTypeManager as MetadataTypeManagerLike | undefined;
		if (!manager?.registeredTypeWidgets || !manager.setType) return;

		const numberWidget = manager.registeredTypeWidgets.number;
		const textWidget = manager.registeredTypeWidgets.text;
		if (!numberWidget || !textWidget) return;

		manager.registeredTypeWidgets[GRAPH_TYPE] = {
			type: GRAPH_TYPE,
			icon: "graph-glyph",
			reservedKeys: [],
			default: () => "",
			name: () => t("properties.graphType"),
			validate: (value: unknown) => {
				if (value === null || value === undefined || value === "") return true;
				if (typeof value === "number") return !isNaN(value);
				if (typeof value === "string") return true;
				return false;
			},
			render: (containerEl, data, context) => {
				if (context.key === settings.sizeProperty) {
					return numberWidget.render(containerEl, data, context);
				}
				if (context.key === settings.colorProperty) {
					return textWidget.render(containerEl, data, context);
				}
				return textWidget.render(containerEl, data, context);
			},
		};

		registerLinkPropertyType(manager);

		manager.setType(settings.sizeProperty, GRAPH_TYPE);
		manager.setType(settings.colorProperty, GRAPH_TYPE);
		manager.setType("tags", "tags");
		manager.setType("aliases", "aliases");

		void manager.save?.();
	} catch (error) {
		console.warn(t("console.propertyTypesFailed"), error);
	}
}

/** @deprecated Use registerCorvidaePropertyTypes */
export function registerGraphPropertyType(
	app: App,
	settings: CorvidaeSettings
): void {
	registerCorvidaePropertyTypes(app, settings);
}

export type { PropertyWidgetLike, MetadataTypeManagerLike } from "./shared";
