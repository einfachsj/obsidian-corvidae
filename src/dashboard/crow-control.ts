import { setIcon } from "obsidian";
import { t } from "../i18n";
import type CorvidaePlugin from "../main";

const PROFILE_ACTIONS_SELECTOR =
	".workspace-sidedock-vault-profile .workspace-sidedock-vault-profile-actions";
const DASHBOARD_TOGGLE_ICON = "bird";

export class DashboardCrowControl {
	private button: HTMLButtonElement | null = null;

	constructor(private plugin: CorvidaePlugin) {}

	onload(): void {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on("layout-change", () => {
				this.ensureButton();
				this.updateButtonState();
			})
		);

		this.plugin.app.workspace.onLayoutReady(() => {
			this.ensureButton();
			this.updateButtonState();
		});
	}

	onunload(): void {
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

	private ensureButton(): void {
		const actionsEl =
			document.querySelector(PROFILE_ACTIONS_SELECTOR) ??
			document.querySelector(".workspace-sidedock-vault-profile");
		if (!actionsEl?.instanceOf(HTMLElement)) return;
		const actions = actionsEl;

		if (actions.querySelector(".corvidae-crow-profile-button")) {
			this.button = actions.querySelector<HTMLButtonElement>(
				".corvidae-crow-profile-button"
			);
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
}
