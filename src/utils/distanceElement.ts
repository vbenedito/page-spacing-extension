function showDistanceElementsTooltip(
  distance: number,
  rect1: DOMRect,
  type: string
): void {
  const distanceLabel: HTMLDivElement = document.createElement("div");
  distanceLabel.textContent = `${distance}px`;
  distanceLabel.style.position = "fixed";
  distanceLabel.style.backgroundColor = "black";
  distanceLabel.style.color = "white";
  distanceLabel.style.padding = "2px 5px";
  distanceLabel.style.borderRadius = "4px";
  distanceLabel.style.zIndex = "9999";

  // Position the label based on the closest edges
  switch (type) {
    case "top-bottom":
      distanceLabel.style.left = `${(rect1.left + rect1.right) / 2}px`;
      distanceLabel.style.top = `${rect1.top - distance}px`;
      break;
    case "bottom-top":
      distanceLabel.style.left = `${(rect1.left + rect1.right) / 2}px`;
      distanceLabel.style.top = `${rect1.bottom + distance}px`;
      break;
    case "left-right":
      distanceLabel.style.left = `${rect1.left - distance}px`;
      distanceLabel.style.top = `${(rect1.top + rect1.bottom) / 2}px`;
      break;
    case "right-left":
      distanceLabel.style.left = `${rect1.right + distance}px`;
      distanceLabel.style.top = `${(rect1.top + rect1.bottom) / 2}px`;
      break;
  }

  document.body.appendChild(distanceLabel);

  // Remove the label after a few seconds
  setTimeout(() => {
    distanceLabel.remove();
  }, 3000);
}

export function calculateElementDistance(
  element1: HTMLElement,
  element2: HTMLElement
): void {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  // Determine the closest edges
  const topDistance = Math.abs(rect1.top - rect2.bottom); // From top of element1 to bottom of element2
  const bottomDistance = Math.abs(rect1.bottom - rect2.top); // From bottom of element1 to top of element2
  const leftDistance = Math.abs(rect1.left - rect2.right); // From left of element1 to right of element2
  const rightDistance = Math.abs(rect1.right - rect2.left); // From right of element1 to left of element2

  // Find the minimum distance
  const distances = [
    { type: "top-bottom", value: topDistance },
    { type: "bottom-top", value: bottomDistance },
    { type: "left-right", value: leftDistance },
    { type: "right-left", value: rightDistance },
  ];

  const closest = distances.reduce((prev, curr) =>
    prev.value < curr.value ? prev : curr
  );

  console.log(`Closest edges: ${closest.type}, Distance: ${closest.value}px`);
  showDistanceElementsTooltip(closest.value, rect1, closest.type);
}
