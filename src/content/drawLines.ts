import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { KonvaType } from "../utils/konvaInstance";
import { eventsHelper } from "./events";
import { Line } from "konva/lib/shapes/Line";

const rulerSize = 30;

export const drawLineWithDistance = ({
  rect1,
  rect2,
  distance,
  highlightLayer,
}: {
  rect1: DOMRect;
  rect2: DOMRect;
  distance: number;
  highlightLayer: Layer;
}) => {
  let x1 = rect1.left + rect1.width / 2;
  let y1 = rect1.top + rect1.height / 2;
  let x2 = rect2.left + rect2.width / 2;
  let y2 = rect2.top + rect2.height / 2;

  // Se for distância vertical (acima ou abaixo)
  if (rect1.left < rect2.right && rect1.right > rect2.left) {
    if (rect1.bottom <= rect2.top) {
      y1 = rect1.bottom; // Extremidade inferior do elemento clicado
      y2 = rect2.top; // Extremidade superior do elemento hover
    } else if (rect1.top >= rect2.bottom) {
      y1 = rect1.top; // Extremidade superior do elemento clicado
      y2 = rect2.bottom; // Extremidade inferior do elemento hover
    }
  }

  // Se for distância horizontal (esquerda ou direita)
  if (rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
    if (rect1.right <= rect2.left) {
      x1 = rect1.right; // Extremidade direita do elemento clicado
      x2 = rect2.left; // Extremidade esquerda do elemento hover
    } else if (rect1.left >= rect2.right) {
      x1 = rect1.left; // Extremidade esquerda do elemento clicado
      x2 = rect2.right; // Extremidade direita do elemento hover
    }
  }

  const line = new Konva.Line({
    points: [x1, y1, x2, y2],
    stroke: "#390099", // Cor da linha vermelha
    strokeWidth: 1,
    lineCap: "round",
    lineJoin: "round",
    name: "distanceLine",
  });

  // Criando setas nas extremidades da linha
  const arrowSize = 6;
  const arrow1 = new Konva.Arrow({
    points: [x1, y1, x2, y2],
    pointerLength: arrowSize,
    pointerWidth: arrowSize,
    fill: "#390099",
    stroke: "#390099",
    strokeWidth: 2,
  });

  // Posição da label no centro da linha
  const labelX = (x1 + x2) / 2;
  const labelY = (y1 + y2) / 2;

  // Criando fundo arredondado para a label
  const labelBg = new Konva.Rect({
    x: labelX - 20,
    y: labelY - 12,
    width: 50,
    height: 24,
    fill: "#390099", // Cor do fundo da label
    cornerRadius: 8,
  });

  const labelXDistance = distance > 99 ? 12 : 8;

  const labelText = new Konva.Text({
    x: labelX - labelXDistance,
    y: labelY - 6,
    text: `${Math.floor(distance)}px`,
    fontSize: 12,
    fontFamily: "Arial",
    fill: "white",
    align: "center",
    verticalAlign: "middle",
  });

  highlightLayer.add(line, arrow1, labelBg, labelText);
  highlightLayer.draw();
};

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
    stroke: "#390099",
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
    stroke: "#390099",
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
    componentType: "component",
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
    componentType: "component",
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
    componentType: "component",
    component: fixedVerticalLine,
    callback: () => (stage.container().style.cursor = "pointer"),
    eventName: "mouseenter",
  });

  eventsHelper({
    componentType: "component",
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
    componentType: "component",
    component: fixedHorizontalLine,
    callback: () => (stage.container().style.cursor = "pointer"),
    eventName: "mouseenter",
  });

  eventsHelper({
    componentType: "component",
    component: fixedHorizontalLine,
    callback: () => (stage.container().style.cursor = "default"),
    eventName: "mouseleave",
  });

  mainLayer.add(fixedHorizontalLine);
  mainLayer.draw();
};
