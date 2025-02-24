import { Layer } from "konva/lib/Layer";
import { drawLineWithDistance } from "../content/drawLines";
import Konva from "konva";

export const calculateEdgeDistance = (
  rect1: DOMRect,
  rect2: DOMRect
): number => {
  let distance = 0;

  // Verifica se os elementos estão alinhados verticalmente
  if (rect1.left < rect2.right && rect1.right > rect2.left) {
    // Distância vertical
    if (rect1.bottom <= rect2.top) {
      distance = rect2.top - rect1.bottom; // Clicado acima do hover
    } else if (rect1.top >= rect2.bottom) {
      distance = rect1.top - rect2.bottom; // Clicado abaixo do hover
    }
  }

  // Verifica se os elementos estão alinhados horizontalmente
  if (rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
    // Distância horizontal
    if (rect1.right <= rect2.left) {
      distance = rect2.left - rect1.right; // Clicado à esquerda do hover
    } else if (rect1.left >= rect2.right) {
      distance = rect1.left - rect2.right; // Clicado à direita do hover
    }
  }

  return Math.abs(distance); // Sempre retornar distância positiva
};

export const removeHighlightsAndLines = (highlightLayer: Layer) => {
  highlightLayer.destroyChildren();
  highlightLayer.draw();
};

const clickHighlightConfig = (event: MouseEvent, highlightLayer: Layer) => {
  const clicked = event.target as HTMLElement;
  let clickedElement: HTMLElement | null = null;
  const element = document.elementFromPoint(event.clientX, event.clientY);

  if (element) {
    const rect = element.getBoundingClientRect();

    if (clicked && clicked !== clickedElement) {
      clickedElement = clicked;

      const highlight = new Konva.Rect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        stroke: "#390099",
        strokeWidth: 1,
      });

      highlightLayer.add(highlight);
    }
  }

  return { clickedElement };
};

const startDrawLineWithDistace = ({
  clickedElementReference = null,
  highlightLayer,
  event,
}: {
  clickedElementReference: HTMLElement | null;
  highlightLayer: Layer;
  event: MouseEvent;
}) => {
  if (clickedElementReference) {
    const hoveredElement = event.target as HTMLElement;

    if (hoveredElement !== clickedElementReference) {
      const clickedRect = clickedElementReference.getBoundingClientRect();
      const hoveredRect = hoveredElement.getBoundingClientRect();

      const distance = calculateEdgeDistance(clickedRect, hoveredRect);

      removeHighlightsAndLines(highlightLayer);
      drawLineWithDistance({
        rect1: clickedRect,
        rect2: hoveredRect,
        distance: distance,
        highlightLayer,
      });
    }
  }
};

export const configMeasureElementsDistance = (highlightLayer: Layer) => {
  let clickedElementReference: HTMLElement | null = null;

  document.addEventListener("click", (event) => {
    const { clickedElement } = clickHighlightConfig(event, highlightLayer);

    clickedElementReference = clickedElement;
  });

  document.addEventListener("mouseover", (event) =>
    startDrawLineWithDistace({ clickedElementReference, highlightLayer, event })
  );
};
