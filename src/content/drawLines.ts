import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { KonvaType } from "../utils/konvaInstance";
import { eventsHelper } from "./events";

const rulerSize = 30;

export const drawTempVerticalLine = ({
  stage,
  horizontalLayer,
}: {
  stage: Stage;
  horizontalLayer: Layer;
}) => {
  // Linha temporária vertical
  const tempVerticalLine = new Konva.Line({
    points: [0, rulerSize, 0, stage.height()],
    stroke: "#00f",
    strokeWidth: 1,
    visible: false,
  });
  horizontalLayer.add(tempVerticalLine);

  return { tempVerticalLine };
};

export const drawTempHorizontalLine = ({
  stage,
  verticalLayer,
}: {
  stage: Stage;
  verticalLayer: Layer;
}) => {
  // Linha temporária horizontal
  const tempHorizontalLine = new Konva.Line({
    points: [rulerSize, 0, stage.width(), 0],
    stroke: "#00f",
    strokeWidth: 1,
    visible: false,
  });
  verticalLayer.add(tempHorizontalLine);

  return { tempHorizontalLine };
};

export const drawFixedVerticalLine = ({
  konva,
  mouseX,
  stage,
  fixedLinesLayer,
}: {
  konva: KonvaType;
  mouseX: number;
  mouseY: number;
  stage: Stage;
  fixedLinesLayer: Layer;
}) => {
  const fixedVerticalLine = new konva.Line({
    points: [mouseX, rulerSize, mouseX, stage.height()],
    stroke: "#f00",
    strokeWidth: 2,
    draggable: true,
    dragBoundFunc: function (pos) {
      return {
        x: pos.x,
        y: this.absolutePosition().y,
      };
    },
  });

  eventsHelper({
    component: fixedVerticalLine,
    callback: () => (stage.container().style.cursor = "pointer"),
    eventName: "mouseenter",
  });

  eventsHelper({
    component: fixedVerticalLine,
    callback: () => (stage.container().style.cursor = "default"),
    eventName: "mouseleave",
  });

  fixedLinesLayer.add(fixedVerticalLine);
  fixedLinesLayer.draw();
};

export const drawFixedHorizontalLine = ({
  konva,
  mouseY,
  stage,
  fixedLinesLayer,
}: {
  konva: KonvaType;
  mouseY: number;
  stage: Stage;
  fixedLinesLayer: Layer;
}) => {
  const fixedHorizontalLine = new konva.Line({
    points: [rulerSize, mouseY, stage.width(), mouseY],
    stroke: "#f00",
    strokeWidth: 2,
    draggable: true,
    dragBoundFunc: function (pos) {
      return {
        y: pos.y,
        x: this.absolutePosition().x,
      };
    },
  });

  eventsHelper({
    component: fixedHorizontalLine,
    callback: () => (stage.container().style.cursor = "pointer"),
    eventName: "mouseenter",
  });

  eventsHelper({
    component: fixedHorizontalLine,
    callback: () => (stage.container().style.cursor = "default"),
    eventName: "mouseleave",
  });

  fixedLinesLayer.add(fixedHorizontalLine);
  fixedLinesLayer.draw();
};
