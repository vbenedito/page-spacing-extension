// import { setupHoverInfo } from "./hoverInfo";
import { handleElementClick } from "./selection";
import { state } from "./state";

// Configurar listener de teclas
export function setupKeyListeners(): void {
  const allowedClickKey = ["Meta", "Control"];
  const allowerHoverKey = ["Shift"];

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (allowerHoverKey.includes(e.key)) {
      state.isShiftPressed = true;
      console.log("shift key pressed.");
    }

    if (allowedClickKey.includes(e.key)) {
      state.isCommandPressed = true;
      console.log("Command/Control key pressed.");
    }
  });

  document.addEventListener("keyup", (e: KeyboardEvent) => {
    if (allowerHoverKey.includes(e.key)) {
      state.isShiftPressed = false;
      console.log("shift key released.");
    }

    if (allowedClickKey.includes(e.key)) {
      state.isCommandPressed = false;
      state.selectedElements = [];
      console.log("Command/Control key released.");
    }
  });
}

// export function setupHoverListener(): void {
//   document.addEventListener(
//     "mouseenter",
//     (event: MouseEvent) => {
//       if (state.isShiftPressed) {
//         setupHoverInfo(event);
//       }
//     },
//     { capture: true }
//   );
// }

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
