import { calculateElementDistance } from "../utils/distanceElement";
import { state } from "./state";

function highlightSelectedElement(element: HTMLElement): void {
  element.style.outline = "2px solid blue";
  setTimeout(() => {
    element.style.outline = "";
  }, 2000);
}

export function handleElementClick(element: HTMLElement): void {
  if (state.selectedElements.length < 2) {
    state.selectedElements.push(element);
    highlightSelectedElement(element);
  }

  if (state.selectedElements.length === 2) {
    calculateElementDistance(
      state.selectedElements[0],
      state.selectedElements[1]
    );
    state.selectedElements = [];
  }
}
