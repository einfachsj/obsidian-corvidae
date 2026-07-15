export const DASHBOARD_GRID_COLUMNS = 6;
export const DASHBOARD_GRID_ROW_HEIGHT_PX = 100;
export const DASHBOARD_GRID_GAP_PX = 12;
export const DASHBOARD_BAR_BOX_COL_WIDTH_PX = 145;
export const DASHBOARD_BAR_BOX_GAP_PX = 10;
export const DASHBOARD_BAR_MIN_COLS = 2;

export function getBarDisplayCols(cols: number): number {
	return Math.max(DASHBOARD_BAR_MIN_COLS, cols);
}

export function getBarBoxWidthPx(cols: number): number {
	const barCols = getBarDisplayCols(cols);
	return (
		barCols * DASHBOARD_BAR_BOX_COL_WIDTH_PX +
		(barCols - 1) * DASHBOARD_BAR_BOX_GAP_PX
	);
}
export const DEFAULT_BOX_COLS = 2;
export const DEFAULT_BOX_ROWS = 3;
export const MAX_BOX_ROWS = 24;
export const MIN_BOX_SIZE = 1;

export type DashboardBoxType =
	| "empty"
	| "graph"
	| "note"
	| "browser"
	| "terminal"
	| "ticket";

export type TicketBoxDisplayMode = "last" | "all";

export interface DashboardBox {
	id: string;
	title: string;
	type: DashboardBoxType;
	notePath?: string;
	link?: string;
	ticketProjectId?: string;
	ticketDisplayMode?: TicketBoxDisplayMode;
	cols: number;
	rows: number;
	col: number;
	row: number;
}

export const DASHBOARD_BOX_TYPES: DashboardBoxType[] = [
	"empty",
	"graph",
	"note",
	"browser",
	"terminal",
	"ticket",
];
