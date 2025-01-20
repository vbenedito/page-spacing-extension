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
  divRulerElement.style.pointerEvents = "auto";

  document.body.appendChild(divRulerElement);
};

export const createCanvasConfig = (konva: KonvaType) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new konva.Stage({
    container: "ruler-container",
    width,
    height,
  });

  const mainLayer = new konva.Layer();
  const highlightLayer = new konva.Layer();

  mainLayer.listening();

  stage.add(mainLayer);
  stage.add(highlightLayer);

  return { stage, mainLayer, highlightLayer };
};
