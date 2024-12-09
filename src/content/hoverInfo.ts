import { createTooltip } from "../utils/distanceLine";

export const setupHoverInfo = () => {
  let isActive = false;

  // Ativar exibição de informações ao pressionar Meta + Shift
  document.addEventListener("keydown", () => {
    isActive = true;
    console.log("Meta and Shift keys pressed together. Hover info activated.");
  });

  // Desativar exibição de informações ao soltar qualquer tecla
  document.addEventListener("keyup", () => {
    isActive = false;
    console.log("Hover info deactivated.");
  });

  // Listener para exibir informações no hover
  document.addEventListener("mouseover", (event: MouseEvent) => {
    if (!isActive) return;

    const element = event.target as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);

    const info = {
      tagName: element.tagName,
      height: styles.height,
      width: styles.width,
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontSize: styles.fontSize,
    };

    console.log(info, rect);

    createTooltip(
      `Tag: ${info.tagName}\nSize: ${info.width} x ${info.height}\nBackground: ${info.backgroundColor}\nColor: ${info.color}\nFont Size: ${info.fontSize}`,
      rect.x + rect.width / 2,
      rect.y - 20 // Posicionar a tooltip acima do elemento
    );
  });
};
