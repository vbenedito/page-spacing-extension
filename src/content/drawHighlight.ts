import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { getElementInfo } from "./getElementStyles";

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

export const drawHoverHighlight = ({
  highlightLayer,
  rulerSize,
  stage,
}: {
  highlightLayer: Layer;
  rulerSize: number;
  stage: Stage;
}) => {
  let currentHighlight: Konva.Rect | null;
  // Tooltip group to contain all parts
  const tooltipGroup = new Konva.Group({
    visible: false,
  });

  const tooltipBackground = new Konva.Rect({
    width: 250,
    height: 140,
    fill: "rgba(50, 50, 50, 0.9)",
    cornerRadius: 5,
  });

  const tooltipTitle = new Konva.Text({
    text: "",
    fontSize: 14,
    fontFamily: "Arial",
    fill: "#fff",
    padding: 8,
    width: 250,
  });

  const separator = new Konva.Line({
    points: [0, 30, 250, 30], // Line coordinates
    stroke: "#ccc",
    strokeWidth: 1,
  });

  const detailsText = new Konva.Text({
    text: "",
    fontSize: 12,
    fontFamily: "Arial",
    fill: "#ddd",
    padding: 5,
    y: 20,
    lineHeight: 1.5,
  });

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

        const { elementTagName, elementInfos } = getElementInfo(element);

        tooltipTitle.text(elementTagName);
        detailsText.text(elementInfos);

        currentHighlight = new Konva.Rect({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          stroke: "#390099",
          strokeWidth: 1,
        });

        // Update tooltip position and show it
        tooltipGroup.position({ x: clientX + 10, y: clientY + 10 });
        tooltipGroup.visible(true);

        // Add components to the group
        tooltipGroup.add(
          tooltipBackground,
          tooltipTitle,
          separator,
          detailsText
        );
        highlightLayer.add(tooltipGroup);

        highlightLayer.add(currentHighlight);
        highlightLayer.draw();
      }
    }
  });
};
