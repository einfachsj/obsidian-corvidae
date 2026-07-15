import type { TicketBoxDisplayMode } from "./box-types";

const CALLOUT_START = /^> \[!\w+\]/;
const TICKET_NOTE_LINE = /^> \[!NOTE\].*TICKET/i;

export function parseCalloutBlocks(content: string): string[] {
	const lines = content.split("\n");
	const blocks: string[] = [];
	let current: string[] = [];

	const flush = (): void => {
		if (current.length > 0) {
			blocks.push(current.join("\n"));
			current = [];
		}
	};

	for (const line of lines) {
		if (CALLOUT_START.test(line)) {
			flush();
			current.push(line);
		} else if (current.length > 0 && (line.startsWith("> ") || line === ">")) {
			current.push(line);
		} else if (current.length > 0 && line.trim() === "") {
			flush();
		}
	}

	flush();
	return blocks;
}

function extractCalloutBlock(lines: string[], startIndex: number): string {
	const block: string[] = [lines[startIndex]];

	for (let i = startIndex + 1; i < lines.length; i++) {
		const line = lines[i];
		if (CALLOUT_START.test(line)) break;
		if (line.startsWith("> ") || line === ">") {
			block.push(line);
			continue;
		}
		if (line.trim() === "") break;
	}

	return block.join("\n");
}

function findTicketCalloutStartIndices(content: string): number[] {
	const lines = content.split("\n");
	const indices: number[] = [];

	for (let i = 0; i < lines.length; i++) {
		if (TICKET_NOTE_LINE.test(lines[i].trim())) {
			indices.push(i);
		}
	}

	return indices;
}

export function extractLastTicketCallout(content: string): string {
	const lines = content.split("\n");
	const indices = findTicketCalloutStartIndices(content);
	if (indices.length === 0) return "";
	return extractCalloutBlock(lines, indices[indices.length - 1]);
}

export function extractAllTicketCallouts(content: string): string {
	const lines = content.split("\n");
	const indices = findTicketCalloutStartIndices(content);
	if (indices.length === 0) return "";

	return indices
		.map((startIndex) => extractCalloutBlock(lines, startIndex))
		.join("\n\n");
}

export function filterTicketAlerts(
	callouts: string[],
	mode: TicketBoxDisplayMode
): string {
	const ticketCallouts = callouts.filter((block) =>
		TICKET_NOTE_LINE.test(block.trim())
	);
	if (ticketCallouts.length === 0) return "";
	if (mode === "last") return ticketCallouts[ticketCallouts.length - 1];
	return ticketCallouts.join("\n\n");
}

export function resolveTicketLogMarkdown(
	content: string,
	mode: TicketBoxDisplayMode
): string {
	if (mode === "last") {
		return extractLastTicketCallout(content);
	}
	return extractAllTicketCallouts(content);
}
