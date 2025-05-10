import { Layer } from "konva/lib/Layer";
import { Line } from "konva/lib/shapes/Line";
import { Stage } from "konva/lib/Stage";
import { KonvaType } from "../utils/konvaInstance";
import {
  drawFixedHorizontalLine,
  drawFixedVerticalLine,
  handleTempLines,
} from "./drawLines";

type LinesProps = Line<{
  points: number[];
  stroke: string;
  strokeWidth: number;
  visible: false;
}>;

interface MouseEventsProps {
  stage: Stage;
  tempHorizontalLine: LinesProps;
  tempVerticalLine: LinesProps;
  mainLayer: Layer;
  rulerSize: number;
}

export const eventsHelper = ({
  component,
  eventName,
  callback,
  componentType,
}: {
  eventName: string;
  callback: () => void;
  component?: Line;
  componentType: "document" | "component";
}) => {
  const mapperComponents = {
    document: document.addEventListener(eventName, callback),
    component: component && component.on(eventName, callback),
  };

  mapperComponents[componentType];
};

export const mouseMoveEvent = ({
  stage,
  tempHorizontalLine,
  tempVerticalLine,
  rulerSize,
  mainLayer,
}: MouseEventsProps) => {
  stage.on("mousemove", () => {
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const mouseX = pointerPosition.x;
      const mouseY = pointerPosition.y;

      if (mouseY <= rulerSize) {
        handleTempLines({
          tempLine: tempVerticalLine,
          isVisible: true,
          points: [mouseX, rulerSize, mouseX, stage.height()],
        });
      } else {
        handleTempLines({
          tempLine: tempVerticalLine,
          isVisible: false,
        });
      }

      if (mouseX <= rulerSize) {
        handleTempLines({
          tempLine: tempHorizontalLine,
          isVisible: true,
          points: [rulerSize, mouseY, stage.width(), mouseY],
        });
      } else {
        handleTempLines({ tempLine: tempHorizontalLine, isVisible: false });
      }

      mainLayer.batchDraw();
      mainLayer.batchDraw();
    }
  });
};

export const mouseClickEvent = ({
  stage,
  rulerSize,
  mainLayer,
  konva,
  highlightLayer,
}: {
  stage: Stage;
  rulerSize: number;
  mainLayer: Layer;
  konva: KonvaType;
  highlightLayer: Layer;
}) => {
  stage.on("click", () => {
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const mouseX = pointerPosition.x;
      const mouseY = pointerPosition.y;

      if (mouseY <= rulerSize) {
        drawFixedVerticalLine({
          mainLayer,
          konva,
          mouseX,
          mouseY,
          stage,
          highlightLayer,
        });
      }

      if (mouseX <= rulerSize) {
        drawFixedHorizontalLine({ mainLayer, konva, mouseY, stage });
      }
    }
  });
};
