// src/content/selection.ts
import { calculateElementDistance } from "../utils/distanceElement";
import { state } from "./state";

// Destacar o elemento selecionado
function highlightElement(element: HTMLElement): void {
  element.style.outline = "2px solid blue";
  setTimeout(() => {
    element.style.outline = ""; // Remove o destaque após um curto período
  }, 2000);
}

// Lidar com a seleção de elementos
export function handleElementClick(element: HTMLElement): void {
  if (state.selectedElements.length < 2) {
    state.selectedElements.push(element);
    highlightElement(element);

    console.log(`Element selected: ${element.tagName}`);
  }

  if (state.selectedElements.length === 2) {
    calculateElementDistance(
      state.selectedElements[0],
      state.selectedElements[1]
    );
    state.selectedElements = []; // Reseta a seleção após calcular a distância
  }
}
