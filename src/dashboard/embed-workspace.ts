import { Workspace, WorkspaceLeaf, WorkspaceSplit } from "obsidian";

type ConstructableWorkspaceSplit = new (
	workspace: Workspace,
	direction: "horizontal" | "vertical"
) => WorkspaceSplit;

export interface EmbeddedLeafMount {
	leaf: WorkspaceLeaf;
	rootSplit: WorkspaceSplit;
}

type WorkspaceSplitWithEl = WorkspaceSplit & { containerEl: HTMLElement };
type WorkspaceLeafWithEl = WorkspaceLeaf & { containerEl: HTMLElement };

export function getLeafContainerEl(leaf: WorkspaceLeaf): HTMLElement {
	return (leaf as WorkspaceLeafWithEl).containerEl;
}

export const GRAPH_BOX_WORKSPACE_CLASS = "corvidae-box-graph-workspace";

export function isLeafInEmbeddedWorkspace(
	leaf: WorkspaceLeaf,
	workspaceClass: string
): boolean {
	return Boolean(getLeafContainerEl(leaf).closest(`.${workspaceClass}`));
}

export function isDashboardGraphEmbed(leaf: WorkspaceLeaf): boolean {
	return isLeafInEmbeddedWorkspace(leaf, GRAPH_BOX_WORKSPACE_CLASS);
}

export function getEmbeddedRootSplit(mount: EmbeddedLeafMount): HTMLElement {
	return (mount.rootSplit as WorkspaceSplitWithEl).containerEl;
}

export function createEmbeddedLeaf(
	workspace: Workspace,
	host: HTMLElement,
	direction: "horizontal" | "vertical" = "vertical",
	workspaceClass = GRAPH_BOX_WORKSPACE_CLASS
): EmbeddedLeafMount {
	const rootSplit = new (WorkspaceSplit as ConstructableWorkspaceSplit)(
		workspace,
		direction
	) as WorkspaceSplitWithEl;

	rootSplit.getRoot = () => workspace.rootSplit;
	rootSplit.getContainer = () => workspace.rootSplit;

	const { containerEl } = rootSplit;
	containerEl.style.width = "100%";
	containerEl.style.height = "100%";
	containerEl.addClass(workspaceClass);

	host.empty();
	host.appendChild(containerEl);

	const leaf = workspace.createLeafInParent(rootSplit, 0);
	return { leaf, rootSplit };
}

export function destroyEmbeddedLeaf(mount: EmbeddedLeafMount): void {
	mount.leaf.detach();
	(mount.rootSplit as WorkspaceSplitWithEl).containerEl.remove();
}

export function reattachEmbeddedLeaf(
	mount: EmbeddedLeafMount,
	host: HTMLElement
): void {
	const containerEl = (mount.rootSplit as WorkspaceSplitWithEl).containerEl;
	if (containerEl.parentElement !== host) {
		host.empty();
		host.appendChild(containerEl);
	}
}
