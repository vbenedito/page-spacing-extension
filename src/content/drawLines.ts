import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { KonvaType } from "../utils/konvaInstance";
import { eventsHelper } from "./events";
import { Line } from "konva/lib/shapes/Line";

const rulerSize = 30;

export const handleTempLines = ({
  tempLine,
  isVisible,
  points,
}: {
  tempLine: Line;
  isVisible: boolean;
  points?: number[];
}) => {
  tempLine.visible(isVisible);
  if (points) {
    tempLine.points(points);
  }
};

export const drawTempVerticalLine = ({
  stage,
  mainLayer,
}: {
  stage: Stage;
  mainLayer: Layer;
}) => {
  const tempVerticalLine = new Konva.Line({
    points: [0, rulerSize, 0, stage.height()],
    stroke: "#00f",
    strokeWidth: 1,
    visible: false,
  });
  mainLayer.add(tempVerticalLine);

  return { tempVerticalLine };
};

export const drawTempHorizontalLine = ({
  stage,
  mainLayer,
}: {
  stage: Stage;
  mainLayer: Layer;
}) => {
  const tempHorizontalLine = new Konva.Line({
    points: [rulerSize, 0, stage.width(), 0],
    stroke: "#00f",
    strokeWidth: 1,
    visible: false,
  });
  mainLayer.add(tempHorizontalLine);

  return { tempHorizontalLine };
};

export const drawFixedVerticalLine = ({
  konva,
  mouseX,
  stage,
  mainLayer,
  highlightLayer,
}: {
  konva: KonvaType;
  mouseX: number;
  mouseY: number;
  stage: Stage;
  mainLayer: Layer;
  highlightLayer: Layer;
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
    eventName: "dragstart",
    callback: () => {
      if (highlightLayer) {
        highlightLayer.hide();
        stage.batchDraw();
      }
    },
  });

  eventsHelper({
    component: fixedVerticalLine,
    eventName: "dragend",
    callback: () => {
      if (highlightLayer) {
        highlightLayer.show();
        stage.batchDraw();
      }
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

  mainLayer.add(fixedVerticalLine);
  mainLayer.draw();
};

export const drawFixedHorizontalLine = ({
  konva,
  mouseY,
  stage,
  mainLayer,
}: {
  konva: KonvaType;
  mouseY: number;
  stage: Stage;
  mainLayer: Layer;
}) => {
  const fixedHorizontalLine = new konva.Line({
    points: [rulerSize, mouseY, stage.width(), mouseY],
    stroke: "#f00",
    strokeWidth: 2,
    draggable: true,
    listening: true,
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

  mainLayer.add(fixedHorizontalLine);
  mainLayer.draw();
};
