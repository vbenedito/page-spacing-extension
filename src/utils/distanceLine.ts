export function createTooltip(
  text: string,
  x: number,
  y: number,
  shouldBeRemoved = true
) {
  const tooltip = document.createElement("div");
  tooltip.textContent = text;
  tooltip.style.position = "absolute";
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  tooltip.style.padding = "5px 10px";
  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  tooltip.style.color = "white";
  tooltip.style.borderRadius = "5px";
  tooltip.style.fontSize = "14px";
  tooltip.style.zIndex = "9999";
  tooltip.style.pointerEvents = "none";
  tooltip.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(tooltip);

  if (!shouldBeRemoved) return;
  setTimeout(() => tooltip.remove(), 3000);
}

export function calculateLinesDistance(line1: HTMLElement, line2: HTMLElement) {
  const rect1 = line1.getBoundingClientRect();
  const rect2 = line2.getBoundingClientRect();

  let distance = 0;
  let tooltipX = 0;
  let tooltipY = 0;

  if (rect1.width > rect1.height && rect2.width > rect2.height) {
    distance = Math.abs(rect1.top - rect2.top);
    tooltipX = (rect1.left + rect1.right) / 2;
    tooltipY = (rect1.top + rect2.top) / 2;
  } else if (rect1.width < rect1.height && rect2.width < rect2.height) {
    distance = Math.abs(rect1.left - rect2.left);
    tooltipX = (rect1.left + rect2.left) / 2;
    tooltipY = (rect1.top + rect1.bottom) / 2;
  } else {
    alert(
      "Cannot calculate distance between a horizontal and a vertical line."
    );
    return;
  }

  createTooltip(`${distance}px`, tooltipX, tooltipY);
}
