import type { MetadataTypeManagerLike, PropertyWidgetLike } from "./shared";
import { t } from "../i18n";
import { validateLinkPropertyValue } from "./shared";

export const LINK_TYPE = "link";
export const LINK_PROPERTY = "link";

export function registerLinkPropertyType(
	manager: MetadataTypeManagerLike
): void {
	const delegate =
		manager.registeredTypeWidgets.links ??
		manager.registeredTypeWidgets.link ??
		manager.registeredTypeWidgets.multitext;

	if (!delegate) return;

	manager.registeredTypeWidgets[LINK_TYPE] = createLinkWidget(delegate);
	manager.setType(LINK_PROPERTY, LINK_TYPE);
}

function createLinkWidget(delegate: PropertyWidgetLike): PropertyWidgetLike {
	return {
		type: LINK_TYPE,
		icon: "links-going-out",
		reservedKeys: [],
		default: () => [],
		name: () => t("properties.linkType"),
		validate: validateLinkPropertyValue,
		render: (containerEl, data, context) =>
			delegate.render(containerEl, data, context),
	};
}
