import { createTooltip } from "../utils/createTooltip";
import { state } from "./state";

export const setupHoverInfo = (event: MouseEvent) => {
  // Listener para exibir informações no hover
  // document.addEventListener("mouseover", (event: MouseEvent) => {
  if (!state.isShiftPressed) return;

  const element = event.target as HTMLElement;
  if (!element) return;

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

  createTooltip(
    `Tag: ${info.tagName}
      Background: ${info.backgroundColor}
      Color: ${info.color}
      Font Size: ${info.fontSize}
      Padding: ${info.padding}
      Margin: ${info.margin}
      Gap: ${info.gap}  
    `,
    rect.x + rect.width / 2,
    rect.y - 20 // Posicionar a tooltip acima do elemento
  );
  // });
};
