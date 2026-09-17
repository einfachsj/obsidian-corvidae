/**
 * Stable crow mark for the dashboard toolbar (no ZWJ emoji).
 */

const CROW_PATH =
	"M12 3c-1.2 1.8-1.6 3.4-1.5 5.1-.9-.4-1.7-.5-2.6-.3-1.4.3-2.5 1.3-3.1 2.6-.4.8-.5 1.7-.3 2.6.3 1.3 1.2 2.4 2.5 2.9-.7.9-1 2-1 3.2 0 .4.3.7.7.7h.1c.3 0 .6-.2.7-.5.3-1 .8-1.8 1.6-2.4.5 1.4 1.5 2.5 2.9 3.1.3.1.7 0 .8-.3.1-.3 0-.7-.3-.8-1.1-.5-1.9-1.4-2.2-2.6 1.1.2 2.2 0 3.1-.6.9-.6 1.5-1.5 1.7-2.6.6.5 1.4.8 2.2.8.4 0 .7-.3.7-.7 0-.9-.3-1.7-.8-2.4.9-.3 1.6-1 2-1.9.2-.4 0-.9-.4-1.1-.4-.2-.9 0-1.1.4-.3.6-.8 1.1-1.5 1.3-.1-1.2-.6-2.3-1.5-3.1C13.6 4.6 12.9 3.7 12 3z";

/** Append a crow SVG into `host` (empties host first). */
export function mountCrowIcon(host: HTMLElement): void {
	host.empty();
	host.addClass("corvidae-crow-icon-host");

	const svg = host.createSvg("svg", {
		cls: "corvidae-crow-icon",
		attr: {
			viewBox: "0 0 24 24",
			width: "1em",
			height: "1em",
			"aria-hidden": "true",
			focusable: "false",
		},
	});
	svg.createSvg("path", {
		attr: {
			d: CROW_PATH,
			fill: "currentColor",
		},
	});
}

/** Inline SVG markup for tips HTML (replaces ZWJ crow emoji). */
export const CROW_SVG_INLINE =
	'<svg class="corvidae-crow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="' +
	CROW_PATH +
	'"/></svg>';
