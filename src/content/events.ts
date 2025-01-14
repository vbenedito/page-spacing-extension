import { Layer } from "konva/lib/Layer";
import { Line } from "konva/lib/shapes/Line";
import { Stage } from "konva/lib/Stage";
import { KonvaType } from "../utils/konvaInstance";
import { drawFixedHorizontalLine, drawFixedVerticalLine } from "./drawLines";

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
  horizontalLayer: Layer;
  verticalLayer: Layer;
  konva: KonvaType;
  rulerSize: number;
}

export const eventsHelper = ({
  component,
  eventName,
  callback,
}: {
  eventName: string;
  callback: () => void;
  component: Line;
}) => {
  component.on(eventName, callback);
};

export const mouseMoveEvent = ({
  stage,
  tempHorizontalLine,
  tempVerticalLine,
  rulerSize,
  horizontalLayer,
  verticalLayer,
}: MouseEventsProps) => {
  stage.on("mousemove", () => {
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const mouseX = pointerPosition.x;
      const mouseY = pointerPosition.y;

      // Exibe a linha temporária somente ao passar o mouse na régua horizontal
      if (mouseY <= rulerSize) {
        tempVerticalLine.visible(true);
        tempVerticalLine.points([mouseX, rulerSize, mouseX, stage.height()]);
      } else {
        tempVerticalLine.visible(false);
      }

      // Exibe a linha temporária somente ao passar o mouse na régua vertical
      if (mouseX <= rulerSize) {
        tempHorizontalLine.visible(true);
        tempHorizontalLine.points([rulerSize, mouseY, stage.width(), mouseY]);
      } else {
        tempHorizontalLine.visible(false);
      }

      horizontalLayer.batchDraw();
      verticalLayer.batchDraw();
    }
  });
};

export const mouseClickEvent = ({
  stage,
  rulerSize,
  fixedLinesLayer,
  konva,
}: {
  stage: Stage;
  rulerSize: number;
  fixedLinesLayer: Layer;
  konva: KonvaType;
}) => {
  stage.on("click", () => {
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition) {
      const mouseX = pointerPosition.x;
      const mouseY = pointerPosition.y;

      // Adiciona uma linha fixa vertical ao clicar na régua horizontal
      if (mouseY <= rulerSize) {
        drawFixedVerticalLine({
          fixedLinesLayer,
          konva,
          mouseX,
          mouseY,
          stage,
        });
      }

      // Adiciona uma linha fixa horizontal ao clicar na régua vertical
      if (mouseX <= rulerSize) {
        drawFixedHorizontalLine({ fixedLinesLayer, konva, mouseY, stage });
      }
    }
  });
};
