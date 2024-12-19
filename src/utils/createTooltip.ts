export function createTooltip(
  content: string,
  x: number,
  y: number
): HTMLElement {
  const tooltip = document.createElement("div");
  tooltip.textContent = content;
  tooltip.style.position = "fixed";
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  tooltip.style.padding = "8px";
  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  tooltip.style.color = "white";
  tooltip.style.borderRadius = "4px";
  tooltip.style.fontSize = "12px";
  tooltip.style.pointerEvents = "none";
  tooltip.style.whiteSpace = "pre-line";
  tooltip.dataset.ignoreTooltip = "true";
  document.body.appendChild(tooltip);
  return tooltip;
}

export function removeTooltip(tooltip: HTMLElement): void {
  if (tooltip.parentNode) {
    tooltip.parentNode.removeChild(tooltip);
  }
}
