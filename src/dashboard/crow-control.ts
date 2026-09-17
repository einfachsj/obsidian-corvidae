import { setIcon } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";

const PROFILE_ACTIONS_SELECTOR =
	".workspace-sidedock-vault-profile .workspace-sidedock-vault-profile-actions";
const DASHBOARD_TOGGLE_ICON = "bird";
const GRAPH_OPEN_ICON = "git-fork";

export class DashboardCrowControl {
	private button: HTMLButtonElement | null = null;
	private graphButton: HTMLButtonElement | null = null;

	constructor(private plugin: CorvidaePlugin) {}

	onload(): void {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on("layout-change", () => {
				this.ensureButtons();
				this.updateButtonState();
			})
		);

		this.plugin.app.workspace.onLayoutReady(() => {
			this.ensureButtons();
			this.updateButtonState();
		});
	}

	onunload(): void {
		this.graphButton?.remove();
		this.graphButton = null;
		this.button?.remove();
		this.button = null;
	}

	updateButtonState(): void {
		if (!this.button) return;

		const open = this.plugin.dashboardLayoutManager.isBarOpen();
		const contentOpen = this.plugin.dashboardLayoutManager.hasContentOpen();

		this.button.toggleClass("is-active", open);
		this.button.toggleClass("is-disabled", !contentOpen);
		this.button.disabled = !contentOpen;
		this.button.setAttribute("aria-pressed", open ? "true" : "false");
		this.button.setAttribute(
			"aria-label",
			open ? t("dashboard.bar.collapse") : t("dashboard.bar.expand")
		);
	}

	private ensureButtons(): void {
		const actionsEl =
			document.querySelector(PROFILE_ACTIONS_SELECTOR) ??
			document.querySelector(".workspace-sidedock-vault-profile");
		if (!actionsEl?.instanceOf(HTMLElement)) return;
		const actions = actionsEl;

		this.ensureGraphButton(actions);
		this.ensureCrowButton(actions);
		this.orderButtons(actions);
	}

	private ensureGraphButton(actions: HTMLElement): void {
		const existing = actions.querySelector<HTMLButtonElement>(
			".corvidae-graph-profile-button"
		);
		if (existing) {
			this.graphButton = existing;
			return;
		}

		const button = actions.createEl("button", {
			cls: "clickable-icon corvidae-graph-profile-button",
			attr: {
				type: "button",
				"aria-label": t("dashboard.actions.openGraph"),
			},
		});
		setIcon(button, GRAPH_OPEN_ICON);
		button.addEventListener("click", () => {
			void this.openStandardGraph();
		});

		this.graphButton = button;
	}

	private ensureCrowButton(actions: HTMLElement): void {
		const existing = actions.querySelector<HTMLButtonElement>(
			".corvidae-crow-profile-button"
		);
		if (existing) {
			this.button = existing;
			return;
		}

		const button = actions.createEl("button", {
			cls: "clickable-icon corvidae-crow-profile-button",
			attr: {
				type: "button",
				"aria-label": t("dashboard.bar.expand"),
			},
		});
		setIcon(button, DASHBOARD_TOGGLE_ICON);
		button.addEventListener("click", () => {
			void this.plugin.dashboardLayoutManager.toggleBar();
		});

		this.button = button;
	}

	/** Keep order: … settings → graph → crow */
	private orderButtons(actions: HTMLElement): void {
		if (!this.graphButton || !this.button) return;
		if (this.graphButton.nextElementSibling !== this.button) {
			actions.insertBefore(this.graphButton, this.button);
		}
		if (this.button.parentElement === actions) {
			actions.appendChild(this.button);
		}
	}

	private async openStandardGraph(): Promise<void> {
		const leaf = this.plugin.app.workspace.getLeaf(false);
		await leaf.setViewState({ type: "graph", state: {}, active: true });
	}
}
