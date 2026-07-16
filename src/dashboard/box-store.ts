import type CorvidaePlugin from "../main";
import { isRecord } from "../frontmatter/utils";
import {
	DASHBOARD_GRID_COLUMNS,
	MAX_BOX_ROWS,
	MIN_BOX_SIZE,
	type DashboardBox,
	type DashboardBoxType,
} from "./box-types";

const MAX_SCAN_ROWS = 64;

function normalizeBoxType(
	type: unknown,
	fields?: {
		notePath?: unknown;
		link?: unknown;
		ticketProjectId?: unknown;
		ticketDisplayMode?: unknown;
	}
): Pick<
	DashboardBox,
	"type" | "notePath" | "link" | "ticketProjectId" | "ticketDisplayMode"
> {
	if (type === "graph") {
		return { type: "graph" };
	}

	if (type === "note") {
		const path =
			typeof fields?.notePath === "string" && fields.notePath.trim()
				? fields.notePath.trim()
				: undefined;
		return { type: "note", notePath: path };
	}

	if (type === "browser") {
		const link =
			typeof fields?.link === "string" && fields.link.trim()
				? fields.link.trim()
				: undefined;
		return { type: "browser", link };
	}

	if (type === "terminal") {
		return { type: "terminal" };
	}

	if (type === "ticket") {
		const ticketProjectId =
			typeof fields?.ticketProjectId === "string" && fields.ticketProjectId.trim()
				? fields.ticketProjectId.trim()
				: undefined;
		const ticketDisplayMode =
			fields?.ticketDisplayMode === "last" || fields?.ticketDisplayMode === "all"
				? fields.ticketDisplayMode
				: "last";
		return { type: "ticket", ticketProjectId, ticketDisplayMode };
	}

	return { type: "empty" };
}

function applyTypeFields(box: DashboardBox): DashboardBox {
	if (box.type !== "note") {
		delete box.notePath;
	}
	if (box.type !== "browser") {
		delete box.link;
	}
	if (box.type !== "ticket") {
		delete box.ticketProjectId;
		delete box.ticketDisplayMode;
	}
	return box;
}

export class DashboardBoxStore {
	private boxes: DashboardBox[] = [];

	constructor(private plugin: CorvidaePlugin) {}

	loadFromData(data: unknown): void {
		const record = data as { dashboardBoxes?: unknown } | null;
		if (!Array.isArray(record?.dashboardBoxes)) {
			this.boxes = [];
			return;
		}

		this.boxes = record.dashboardBoxes
			.map((entry) => this.normalizeBox(entry))
			.filter((box): box is DashboardBox => box !== null);
	}

	getBoxes(): DashboardBox[] {
		return [...this.boxes];
	}

	getBoxById(id: string): DashboardBox | null {
		return this.boxes.find((box) => box.id === id) ?? null;
	}

	findPlacement(
		cols: number,
		rows: number,
		excludeId?: string
	): { col: number; row: number } | null {
		if (cols < 1 || rows < 1 || cols > DASHBOARD_GRID_COLUMNS) {
			return null;
		}

		for (let row = 0; row < MAX_SCAN_ROWS; row++) {
			for (let col = 0; col <= DASHBOARD_GRID_COLUMNS - cols; col++) {
				if (this.canPlaceAt(col, row, cols, rows, excludeId)) {
					return { col, row };
				}
			}
		}

		return null;
	}

	findValidMovePositions(boxId: string): Array<{ col: number; row: number }> {
		const box = this.getBoxById(boxId);
		if (!box) return [];

		const positions: Array<{ col: number; row: number }> = [];
		for (let row = 0; row < MAX_SCAN_ROWS; row++) {
			for (let col = 0; col <= DASHBOARD_GRID_COLUMNS - box.cols; col++) {
				if (this.canPlaceAt(col, row, box.cols, box.rows, boxId)) {
					positions.push({ col, row });
				}
			}
		}
		return positions;
	}

	canFitBoxSize(
		id: string,
		col: number,
		row: number,
		cols: number,
		rows: number
	): boolean {
		if (cols < MIN_BOX_SIZE || rows < MIN_BOX_SIZE) return false;
		if (cols > DASHBOARD_GRID_COLUMNS || col + cols > DASHBOARD_GRID_COLUMNS) {
			return false;
		}
		if (rows > MAX_BOX_ROWS) return false;
		return this.canPlaceAt(col, row, cols, rows, id);
	}

	async addBox(input: {
		title: string;
		type?: DashboardBoxType;
		notePath?: string;
		link?: string;
		ticketProjectId?: string;
		ticketDisplayMode?: DashboardBox["ticketDisplayMode"];
		cols: number;
		rows: number;
	}): Promise<{ ok: true; box: DashboardBox } | { ok: false; reason: "noSpace" }> {
		const placement = this.findPlacement(input.cols, input.rows);
		if (!placement) {
			return { ok: false, reason: "noSpace" };
		}

		const typeFields = normalizeBoxType(input.type, {
			notePath: input.notePath,
			link: input.link,
			ticketProjectId: input.ticketProjectId,
			ticketDisplayMode: input.ticketDisplayMode,
		});
		const box: DashboardBox = applyTypeFields({
			id: crypto.randomUUID(),
			title: input.title.trim(),
			...typeFields,
			cols: input.cols,
			rows: input.rows,
			col: placement.col,
			row: placement.row,
		});

		this.boxes.push(box);
		await this.persist();
		return { ok: true, box };
	}

	async updateBoxTitle(
		id: string,
		title: string
	): Promise<
		{ ok: true; box: DashboardBox } | { ok: false; reason: "notFound" }
	> {
		const index = this.boxes.findIndex((box) => box.id === id);
		if (index < 0) return { ok: false, reason: "notFound" };

		const updated: DashboardBox = {
			...this.boxes[index],
			title: title.trim(),
		};

		this.boxes[index] = updated;
		await this.persist();
		return { ok: true, box: updated };
	}

	async updateBox(
		id: string,
		input: {
			title: string;
			type: DashboardBoxType;
			notePath?: string;
			link?: string;
			ticketProjectId?: string;
			ticketDisplayMode?: DashboardBox["ticketDisplayMode"];
		}
	): Promise<{ ok: true; box: DashboardBox } | { ok: false; reason: "notFound" }> {
		const index = this.boxes.findIndex((box) => box.id === id);
		if (index < 0) return { ok: false, reason: "notFound" };

		const typeFields = normalizeBoxType(input.type, {
			notePath: input.notePath,
			link: input.link,
			ticketProjectId: input.ticketProjectId,
			ticketDisplayMode: input.ticketDisplayMode,
		});
		const updated: DashboardBox = applyTypeFields({
			...this.boxes[index],
			title: input.title.trim(),
			...typeFields,
		});

		this.boxes[index] = updated;
		await this.persist();
		return { ok: true, box: updated };
	}

	async resizeBox(
		id: string,
		cols: number,
		rows: number
	): Promise<
		{ ok: true; box: DashboardBox } | { ok: false; reason: "notFound" | "noSpace" }
	> {
		const index = this.boxes.findIndex((box) => box.id === id);
		if (index < 0) return { ok: false, reason: "notFound" };

		const current = this.boxes[index];
		const nextCols = Math.max(MIN_BOX_SIZE, Math.min(cols, DASHBOARD_GRID_COLUMNS - current.col));
		const nextRows = Math.max(MIN_BOX_SIZE, Math.min(rows, MAX_BOX_ROWS));

		if (
			!this.canPlaceAt(current.col, current.row, nextCols, nextRows, id)
		) {
			return { ok: false, reason: "noSpace" };
		}

		const updated: DashboardBox = {
			...current,
			cols: nextCols,
			rows: nextRows,
		};

		this.boxes[index] = updated;
		await this.persist();
		return { ok: true, box: updated };
	}

	async moveBox(
		id: string,
		col: number,
		row: number
	): Promise<{ ok: true; box: DashboardBox } | { ok: false; reason: "notFound" | "noSpace" }> {
		const index = this.boxes.findIndex((box) => box.id === id);
		if (index < 0) return { ok: false, reason: "notFound" };

		const current = this.boxes[index];
		if (!this.canPlaceAt(col, row, current.cols, current.rows, id)) {
			return { ok: false, reason: "noSpace" };
		}

		const updated: DashboardBox = { ...current, col, row };
		this.boxes[index] = updated;
		await this.persist();
		return { ok: true, box: updated };
	}

	async deleteBox(
		id: string
	): Promise<{ ok: true } | { ok: false; reason: "notFound" }> {
		const index = this.boxes.findIndex((box) => box.id === id);
		if (index < 0) return { ok: false, reason: "notFound" };

		this.boxes.splice(index, 1);
		await this.persist();
		return { ok: true };
	}

	async persist(): Promise<void> {
		const raw = (await this.plugin.loadData()) as unknown;
		const existing = isRecord(raw) ? raw : {};
		await this.plugin.saveData({
			...existing,
			...this.plugin.settings,
			dashboardBoxes: this.boxes,
		});
	}

	private canPlaceAt(
		col: number,
		row: number,
		cols: number,
		rows: number,
		excludeId?: string
	): boolean {
		for (const box of this.boxes) {
			if (excludeId && box.id === excludeId) continue;
			if (this.overlaps(col, row, cols, rows, box)) {
				return false;
			}
		}
		return true;
	}

	private overlaps(
		col: number,
		row: number,
		cols: number,
		rows: number,
		box: DashboardBox
	): boolean {
		const colEnd = col + cols;
		const rowEnd = row + rows;
		const boxColEnd = box.col + box.cols;
		const boxRowEnd = box.row + box.rows;

		return (
			col < boxColEnd &&
			colEnd > box.col &&
			row < boxRowEnd &&
			rowEnd > box.row
		);
	}

	private normalizeBox(entry: unknown): DashboardBox | null {
		if (!entry || typeof entry !== "object") return null;

		const raw = entry as Partial<DashboardBox>;
		if (
			typeof raw.id !== "string" ||
			typeof raw.title !== "string" ||
			typeof raw.cols !== "number" ||
			typeof raw.rows !== "number" ||
			typeof raw.col !== "number" ||
			typeof raw.row !== "number"
		) {
			return null;
		}

		if (raw.cols < MIN_BOX_SIZE || raw.rows < MIN_BOX_SIZE || raw.cols > DASHBOARD_GRID_COLUMNS) {
			return null;
		}
		if (raw.rows > MAX_BOX_ROWS) {
			return null;
		}
		if (raw.col < 0 || raw.row < 0 || raw.col + raw.cols > DASHBOARD_GRID_COLUMNS) {
			return null;
		}

		const typeFields = normalizeBoxType(raw.type, {
			notePath: raw.notePath,
			link: raw.link,
			ticketProjectId: raw.ticketProjectId,
			ticketDisplayMode: raw.ticketDisplayMode,
		});
		return applyTypeFields({
			id: raw.id,
			title: raw.title.trim(),
			...typeFields,
			cols: raw.cols,
			rows: raw.rows,
			col: raw.col,
			row: raw.row,
		});
	}
}
