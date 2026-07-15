import {
	App,
	Workspace,
	WorkspaceLeaf,
	WorkspaceSidedock,
	WorkspaceTabs,
} from "obsidian";
import { getLeafContainerEl } from "../dashboard/embed-workspace";

const FILE_PROPERTIES_VIEW = "file-properties";

type WorkspaceTabsInternal = WorkspaceTabs & {
	children?: WorkspaceLeaf[];
};

type WorkspaceLeafInternal = WorkspaceLeaf & {
	id?: string;
};

type WorkspaceInternal = Workspace & {
	requestUpdateLayout?: () => void;
};

export async function ensureFilePropertiesSidebarOnFirstRun(
	app: App,
	isInitialized: () => boolean,
	markInitialized: () => Promise<void>
): Promise<void> {
	if (isInitialized()) return;

	const apply = async (): Promise<void> => {
		if (isInitialized()) return;

		try {
			const { workspace } = app;
			const rightSplit = workspace.rightSplit;

			if (rightSplit instanceof WorkspaceSidedock && rightSplit.collapsed) {
				rightSplit.expand();
			}

			let leaf: WorkspaceLeaf | null = null;

			if (typeof workspace.ensureSideLeaf === "function") {
				leaf = await workspace.ensureSideLeaf(FILE_PROPERTIES_VIEW, "right", {
					active: true,
					reveal: true,
					split: false,
				});
			} else {
				leaf =
					workspace
						.getLeavesOfType(FILE_PROPERTIES_VIEW)
						.find((candidate) =>
							isRightSidebarLeaf(candidate, workspace.rightSplit)
						) ?? null;

				if (!leaf) {
					const created = workspace.getRightLeaf(false);
					if (created) {
						await created.setViewState({
							type: FILE_PROPERTIES_VIEW,
							active: true,
						});
						leaf = created;
					}
				}
			}

			if (leaf) {
				moveFilePropertiesLeafFirst(workspace, leaf);
				await workspace.revealLeaf(leaf);
			}

			await markInitialized();
		} catch (error) {
			console.warn(
				"CORVIDAE: File-Properties-Sidebar konnte nicht geöffnet werden",
				error
			);
		}
	};

	app.workspace.onLayoutReady(() => {
		void apply();
	});
}

function moveFilePropertiesLeafFirst(
	workspace: Workspace,
	leaf: WorkspaceLeaf
): void {
	const tabs = leaf.parent;
	if (!(tabs instanceof WorkspaceTabs)) return;

	const children = (tabs as WorkspaceTabsInternal).children;
	if (Array.isArray(children)) {
		const index = children.indexOf(leaf);
		if (index > 0) {
			children.splice(index, 1);
			children.unshift(leaf);
		}
	}

	const tabsEl = getLeafContainerEl(leaf).closest(".workspace-tabs");
	const headerContainer = tabsEl?.querySelector(
		".workspace-tab-header-container"
	);
	if (headerContainer) {
		const leafId = (leaf as WorkspaceLeafInternal).id;
		const header =
			(leafId
				? headerContainer.querySelector(
						`.workspace-tab-header[data-tab-id="${leafId}"]`
					)
				: null) ??
			headerContainer.querySelector(
				`.workspace-tab-header[data-type="${FILE_PROPERTIES_VIEW}"]`
			) ??
			headerContainer.querySelector(
				`.workspace-tab-header[aria-label*="File properties"]`
			) ??
			headerContainer.querySelector(
				`.workspace-tab-header[aria-label*="Dateieigenschaften"]`
			);

		if (header) {
			headerContainer.insertBefore(header, headerContainer.firstChild);
		}
	}

	(workspace as WorkspaceInternal).requestUpdateLayout?.();
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
