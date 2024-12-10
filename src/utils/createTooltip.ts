export function createTooltip(
  text: string,
  x: number,
  y: number,
  shouldBeRemoved = true
) {
  const tooltip = document.createElement("div");
  tooltip.textContent = text;
  tooltip.className = "tooltip";
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  document.body.appendChild(tooltip);

  if (!shouldBeRemoved) return;
  setTimeout(() => tooltip.remove(), 3000);
}

// export function calculateLinesDistance(line1: HTMLElement, line2: HTMLElement) {
//   const rect1 = line1.getBoundingClientRect();
//   const rect2 = line2.getBoundingClientRect();

//   let distance = 0;
//   let tooltipX = 0;
//   let tooltipY = 0;

//   if (rect1.width > rect1.height && rect2.width > rect2.height) {
//     distance = Math.abs(rect1.top - rect2.top);
//     tooltipX = (rect1.left + rect1.right) / 2;
//     tooltipY = (rect1.top + rect2.top) / 2;
//   } else if (rect1.width < rect1.height && rect2.width < rect2.height) {
//     distance = Math.abs(rect1.left - rect2.left);
//     tooltipX = (rect1.left + rect2.left) / 2;
//     tooltipY = (rect1.top + rect1.bottom) / 2;
//   } else {
//     alert(
//       "Cannot calculate distance between a horizontal and a vertical line."
//     );
//     return;
//   }

//   createTooltip(`${distance}px`, tooltipX, tooltipY);
// }
