import { setupHoverInfo } from "./hoverInfo";
import { handleElementClick } from "./selection";
import { state } from "./state";

// Configurar listener de teclas
export function setupKeyListeners(): void {
  const allowedKeys = ["Tab", "Meta", "Alt"];

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (allowedKeys.includes(e.key) || e.ctrlKey) {
      state.isCommandPressed = true;
      console.log("Command key pressed.");

      if ((e.key === "Meta" || e.ctrlKey) && e.shiftKey) {
        console.log(
          "Meta and Shift keys pressed together. Hover info activated."
        );
        setupHoverInfo();
      }
    }
  });

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    if (!e.metaKey) {
      state.isCommandPressed = false;
      state.selectedElements = [];
      console.log("Command key released.");
    }
  });
}

// Configurar listener de cliques
export function setupClickListener(): void {
  document.addEventListener(
    "click",
    (e: MouseEvent) => {
      if (state.isCommandPressed) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLElement;
        handleElementClick(target);
      }
    },
    { capture: true }
  );
}
