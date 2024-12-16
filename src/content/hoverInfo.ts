import { createTooltip, removeTooltip } from "../utils/createTooltip";
import { state } from "./state";

export function setupHoverListener(): void {
  let currentTooltip: HTMLElement | null = null;

  const onMouseMove = (event: MouseEvent) => {
    if (!state.isShiftPressed) {
      if (currentTooltip) {
        removeTooltip(currentTooltip);
        currentTooltip = null;
      }
      return;
    }

    const element = event.target as HTMLElement;
    if (!element || element.dataset.ignoreTooltip) return;

    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);

    const info = {
      tagName: element.tagName,
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontSize: styles.fontSize,
      padding: styles.padding,
      margin: styles.margin,
      gap: styles.gap,
    };

    // Atualiza ou cria tooltip
    if (currentTooltip) {
      currentTooltip.innerHTML = `
        <div><strong>Tag</strong>: ${info.tagName}</div>
        <div><strong>Background</strong>: ${info.backgroundColor}</div>
        <div><strong>Color</strong>: ${info.color}</div>
        <div><strong>Font Size</strong>: ${info.fontSize}</div>
        <div><strong>Padding</strong>: ${info.padding}</div>
        <div><strong>Margin</strong>: ${info.margin}</div>
        <div><strong>Gap</strong>: ${info.gap}</div>
      `;
      currentTooltip.style.left = `${rect.x + rect.width / 2}px`;
      currentTooltip.style.top = `${rect.y - 20}px`;
    } else {
      currentTooltip = createTooltip(
        `<div><strong>Tag</strong>: ${info.tagName}</div>
        <div><strong>Background</strong>: ${info.backgroundColor}</div>
        <div><strong>Color</strong>: ${info.color}</div>
        <div><strong>Font Size</strong>: ${info.fontSize}</div>
        <div><strong>Padding</strong>: ${info.padding}</div>
        <div><strong>Margin</strong>: ${info.margin}</div>
        <div><strong>Gap</strong>: ${info.gap}</div>`,
        rect.x + rect.width / 2,
        rect.y - 20
      );
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      state.isShiftPressed = true;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      state.isShiftPressed = false;
      if (currentTooltip) {
        removeTooltip(currentTooltip);
        currentTooltip = null;
      }
    }
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
}
