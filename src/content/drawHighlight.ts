import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";

const isCursorOnFixedLine = ({
  stage,
  clientX,
  clientY,
}: {
  stage: Stage;
  clientX: number;
  clientY: number;
}) => {
  const isOnFixedLine =
    stage.find((node: any) => {
      return (
        node.getClassName() === "Line" &&
        node.draggable() &&
        node.intersects({ x: clientX, y: clientY })
      );
    }).length > 0;

  return isOnFixedLine;
};

const resetHighlight = (
  currentHighlight: Konva.Rect | null,
  highlightLayer: Layer
) => {
  if (currentHighlight) {
    currentHighlight.destroy();
    currentHighlight = null;
    highlightLayer.destroy();
  }
};

const updateRulerContainerStyle = ({
  stage,
  isOverRulerOrLine,
  rulerContainer,
  currentHighlight,
  highlightLayer,
}: {
  stage: Stage;
  isOverRulerOrLine: boolean;
  rulerContainer: HTMLElement;
  currentHighlight: Konva.Rect | null;
  highlightLayer: Layer;
}) => {
  if (isOverRulerOrLine) {
    rulerContainer.style.pointerEvents = "auto";
    resetHighlight(currentHighlight, highlightLayer);
  } else {
    stage.add(highlightLayer);
    rulerContainer.style.pointerEvents = "none";
  }
};

export const drawHighlight = ({
  highlightLayer,
  rulerSize,
  stage,
}: {
  highlightLayer: Layer;
  rulerSize: number;
  stage: Stage;
}) => {
  let currentHighlight: Konva.Rect | null;

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const isOverHorizontalRuler = clientY <= rulerSize;
    const isOverVerticalRuler = clientX <= rulerSize;
    const isOnFixedLine = isCursorOnFixedLine({ stage, clientX, clientY });

    const rulerContainer = document.getElementById("ruler-container");

    const isOverRulerOrLine =
      isOverHorizontalRuler || isOverVerticalRuler || isOnFixedLine;

    if (rulerContainer) {
      updateRulerContainerStyle({
        isOverRulerOrLine,
        currentHighlight,
        highlightLayer,
        rulerContainer,
        stage,
      });
    }

    if (!isOverHorizontalRuler && !isOverVerticalRuler && !isOnFixedLine) {
      const element = document.elementFromPoint(clientX, clientY);
      if (element) {
        const rect = element.getBoundingClientRect();

        if (currentHighlight) {
          currentHighlight.destroy();
          currentHighlight = null;
        }

        currentHighlight = new Konva.Rect({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          stroke: "red",
          strokeWidth: 1,
        });

        highlightLayer.add(currentHighlight);
        highlightLayer.draw();
      }
    }
  });
};
