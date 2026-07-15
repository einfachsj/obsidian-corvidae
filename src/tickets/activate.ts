import {
	App,
	Workspace,
	WorkspaceLeaf,
	WorkspaceParent,
	WorkspaceSidedock,
} from "obsidian";
import { CORVIDAE_TICKETS_VIEW } from "./view";

export const TICKETS_SIDEBAR_HEIGHT_PX = 220;
const FILE_PROPERTIES_VIEW = "file-properties";

export async function activateTicketsSidebar(app: App): Promise<void> {
	const { workspace } = app;
	const rightSplit = workspace.rightSplit;

	if (rightSplit instanceof WorkspaceSidedock && rightSplit.collapsed) {
		rightSplit.expand();
	}

	detachMainAreaTicketLeaves(workspace);

	let ticketsLeaf = findRightSidebarTicketsLeaf(workspace, rightSplit);

	if (!ticketsLeaf) {
		for (const leaf of workspace.getLeavesOfType(CORVIDAE_TICKETS_VIEW)) {
			if (isRightSidebarLeaf(leaf, rightSplit)) {
				leaf.detach();
			}
		}

		const referenceLeaf = await ensureRightSidebarReferenceLeaf(workspace);
		if (!referenceLeaf) return;

		ticketsLeaf = workspace.createLeafBySplit(
			referenceLeaf,
			"horizontal",
			false
		);
		await ticketsLeaf.setViewState({
			type: CORVIDAE_TICKETS_VIEW,
			active: true,
		});
	} else if (ticketsLeaf.view.getViewType() !== CORVIDAE_TICKETS_VIEW) {
		await ticketsLeaf.setViewState({
			type: CORVIDAE_TICKETS_VIEW,
			active: true,
		});
	}

	dedupeRightSidebarTicketLeaves(workspace, rightSplit, ticketsLeaf);
	applySidebarTicketsSplitDimensions(ticketsLeaf);
	requestAnimationFrame(() => {
		applySidebarTicketsSplitDimensions(ticketsLeaf);
	});
	await workspace.revealLeaf(ticketsLeaf);
}

async function ensureRightSidebarReferenceLeaf(
	workspace: Workspace
): Promise<WorkspaceLeaf | null> {
	const existing = findRightSidebarReferenceLeaf(workspace);
	if (existing) return existing;

	if (typeof workspace.ensureSideLeaf === "function") {
		return workspace.ensureSideLeaf(FILE_PROPERTIES_VIEW, "right", {
			active: false,
			reveal: false,
			split: false,
		});
	}

	const created = workspace.getRightLeaf(false);
	if (!created) return null;

	await created.setViewState({ type: "empty", active: false });
	return created;
}

function findRightSidebarReferenceLeaf(workspace: Workspace): WorkspaceLeaf | null {
	const rightSplit = workspace.rightSplit;

	const propertiesLeaf = workspace
		.getLeavesOfType(FILE_PROPERTIES_VIEW)
		.find((leaf) => isRightSidebarLeaf(leaf, rightSplit));
	if (propertiesLeaf) return propertiesLeaf;

	let found: WorkspaceLeaf | null = null;
	workspace.iterateAllLeaves((leaf) => {
		if (found) return;
		if (!isRightSidebarLeaf(leaf, rightSplit)) return;
		if (isTicketsLeaf(leaf)) return;
		found = leaf;
	});
	return found;
}

function findRightSidebarTicketsLeaf(
	workspace: Workspace,
	rightSplit: unknown
): WorkspaceLeaf | null {
	return (
		workspace
			.getLeavesOfType(CORVIDAE_TICKETS_VIEW)
			.find((leaf) => isRightSidebarLeaf(leaf, rightSplit)) ?? null
	);
}

function detachMainAreaTicketLeaves(workspace: Workspace): void {
	for (const leaf of workspace.getLeavesOfType(CORVIDAE_TICKETS_VIEW)) {
		if (isMainAreaLeaf(leaf, workspace)) {
			leaf.detach();
		}
	}
}

function dedupeRightSidebarTicketLeaves(
	workspace: Workspace,
	rightSplit: unknown,
	keep: WorkspaceLeaf
): void {
	for (const leaf of workspace.getLeavesOfType(CORVIDAE_TICKETS_VIEW)) {
		if (leaf === keep) continue;
		if (!isRightSidebarLeaf(leaf, rightSplit)) continue;
		leaf.detach();
	}
}

function isTicketsLeaf(leaf: WorkspaceLeaf): boolean {
	return leaf.view.getViewType() === CORVIDAE_TICKETS_VIEW;
}

function isRightSidebarLeaf(
	leaf: { parent: unknown },
	rightSplit: unknown
): boolean {
	let parent = leaf.parent as { parent?: unknown } | null;
	while (parent) {
		if (parent === rightSplit) return true;
		parent = (parent.parent as { parent?: unknown } | null) ?? null;
	}
	return false;
}

function isMainAreaLeaf(leaf: WorkspaceLeaf, workspace: Workspace): boolean {
	const { leftSplit, rightSplit, rootSplit } = workspace;
	let current: WorkspaceParent | null = leaf.parent;

	while (current && current !== rootSplit) {
		if (current === leftSplit || current === rightSplit) {
			return false;
		}
		current = current.parent;
	}

	return current === rootSplit;
}

function findHorizontalSplitAncestor(
	leaf: WorkspaceLeaf
): WorkspaceParent | null {
	let current: WorkspaceParent | null = leaf.parent;
	while (current) {
		if (
			"direction" in current &&
			(current as { direction?: string }).direction === "horizontal"
		) {
			return current;
		}
		current = current.parent;
	}
	return null;
}

function applySidebarTicketsSplitDimensions(ticketsLeaf: WorkspaceLeaf): void {
	const split = findHorizontalSplitAncestor(ticketsLeaf);
	if (!split) return;

	const children = (split as { children?: WorkspaceParent[] }).children;
	if (!children || children.length !== 2) return;

	const splitEl = ticketsLeaf.view.containerEl.closest(
		".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split"
	);
	const totalHeight = splitEl?.clientHeight ?? 0;
	if (totalHeight <= TICKETS_SIDEBAR_HEIGHT_PX) return;

	const ticketsPercent = (TICKETS_SIDEBAR_HEIGHT_PX / totalHeight) * 100;
	const topPercent = 100 - ticketsPercent;

	(children[0] as { dimension?: number }).dimension = topPercent;
	(children[1] as { dimension?: number }).dimension = ticketsPercent;
}
