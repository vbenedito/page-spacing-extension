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
import { drawHoverHighlight } from "../content/drawHighlight";
// import { configMeasureElementsDistance } from "../utils/distanceElement";

(() => {
  const createCanvas = () => {
    createMainContainer();

    const rulerSize = 30;

    const { stage, mainLayer, highlightLayer } = createCanvasConfig(Konva);

    drawHorizontalRuler({ stage, mainLayer });
    drawVerticalRuler({ stage, mainLayer });

    const { tempVerticalLine } = drawTempVerticalLine({
      stage,
      mainLayer,
    });
    const { tempHorizontalLine } = drawTempHorizontalLine({
      stage,
      mainLayer,
    });

    mouseMoveEvent({
      mainLayer,
      rulerSize,
      stage,
      tempHorizontalLine,
      tempVerticalLine,
    });

    mouseClickEvent({
      mainLayer,
      konva: Konva,
      rulerSize,
      stage,
      highlightLayer,
    });

    drawHoverHighlight({ highlightLayer, rulerSize, stage });
    // configMeasureElementsDistance(highlightLayer);

    window.addEventListener("resize", () => {
      stage.width(window.innerWidth);
      stage.height(window.innerHeight);
      mainLayer.clear();
      drawHorizontalRuler({ stage, mainLayer });
      drawVerticalRuler({ stage, mainLayer });
    });
  };

  createCanvas();
})();
