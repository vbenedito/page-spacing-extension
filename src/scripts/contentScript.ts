import Konva from "konva";
import {
  createCanvasConfig,
  createMainContainer,
} from "../content/createElements";
import { drawHorizontalRuler, drawVerticalRuler } from "../content/drawRuler";
import {
  drawTempHorizontalLine,
  drawTempVerticalLine,
} from "../content/drawLines";
import { mouseClickEvent, mouseMoveEvent } from "../content/events";

(() => {
  const createCanvas = () => {
    createMainContainer();

    const rulerSize = 30;

    const { stage, horizontalLayer, verticalLayer, fixedLinesLayer } =
      createCanvasConfig(Konva);

    drawHorizontalRuler({ stage, horizontalLayer });
    drawVerticalRuler({ stage, verticalLayer });

    const { tempVerticalLine } = drawTempVerticalLine({
      stage,
      horizontalLayer,
    });
    const { tempHorizontalLine } = drawTempHorizontalLine({
      stage,
      verticalLayer,
    });

    // Atualiza a posição da linha temporária vertical ao mover o mouse na régua horizontal
    mouseMoveEvent({
      horizontalLayer,
      rulerSize,
      stage,
      tempHorizontalLine,
      tempVerticalLine,
      verticalLayer,
      konva: Konva,
    });

    // Adiciona uma linha fixa vertical ao clicar na régua horizontal
    mouseClickEvent({ fixedLinesLayer, konva: Konva, rulerSize, stage });

    // Atualiza ao redimensionar a janela
    window.addEventListener("resize", () => {
      stage.width(window.innerWidth);
      stage.height(window.innerHeight);
      horizontalLayer.clear();
      verticalLayer.clear();
      drawHorizontalRuler({ stage, horizontalLayer });
      drawVerticalRuler({ stage, verticalLayer });
    });
  };

  createCanvas();
})();
