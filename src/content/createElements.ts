import type { KonvaType } from "../utils/konvaInstance";

export const createMainContainer = () => {
  const divRulerElement = document.createElement("div");
  divRulerElement.id = "ruler-container";
  divRulerElement.style.position = "fixed";
  divRulerElement.style.top = "0";
  divRulerElement.style.left = "0";
  divRulerElement.style.zIndex = "2147483647";
  divRulerElement.style.width = "100vw";
  divRulerElement.style.height = "100vh";

  document.body.appendChild(divRulerElement);
};

export const createCanvasConfig = (konva: KonvaType) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new konva.Stage({
    container: "ruler-container",
    width: width,
    height: height,
  });

  const horizontalLayer = new konva.Layer();
  const verticalLayer = new konva.Layer();
  const fixedLinesLayer = new konva.Layer(); // Camada para linhas fixadas
  stage.add(horizontalLayer, verticalLayer, fixedLinesLayer);

  return { stage, horizontalLayer, verticalLayer, fixedLinesLayer };
};
