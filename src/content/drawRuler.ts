import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";

const rulerHorizontalSize = 30;
const rulerVerticalSize = 35;
export function drawHorizontalRuler({
  stage,
  horizontalLayer,
}: {
  stage: Stage;
  horizontalLayer: Layer;
}) {
  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: rulerHorizontalSize,
    fill: "#f0f0f0",
  });
  horizontalLayer.add(background);

  const step = 10;
  const bigStep = 50;

  for (let x = 0; x < stage.width(); x += step) {
    const lineHeight = x % bigStep === 0 ? 15 : 10;
    const line = new Konva.Line({
      points: [x, 0, x, lineHeight],
      stroke: "#aaa",
      strokeWidth: 1,
    });
    horizontalLayer.add(line);

    if (x % bigStep === 0) {
      const text = new Konva.Text({
        x: x + 2,
        y: lineHeight + 2,
        text: x.toString(),
        fontSize: 8,
        fill: "#555",
      });
      horizontalLayer.add(text);
    }
  }

  horizontalLayer.draw();
}

export function drawVerticalRuler({
  stage,
  verticalLayer,
}: {
  stage: Stage;
  verticalLayer: Layer;
}) {
  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: rulerVerticalSize,
    height: stage.height(),
    fill: "#f0f0f0",
  });
  verticalLayer.add(background);

  const step = 10;
  const bigStep = 50;

  for (let y = 0; y < stage.height(); y += step) {
    const lineWidth = y % bigStep === 0 ? 15 : 10;
    const line = new Konva.Line({
      points: [0, y, lineWidth, y],
      stroke: "#aaa",
      strokeWidth: 1,
    });
    verticalLayer.add(line);

    if (y % bigStep === 0) {
      const text = new Konva.Text({
        x: lineWidth + 2,
        y: y + 2,
        text: y.toString(),
        fontSize: 8,
        fill: "#555",
      });
      verticalLayer.add(text);
    }
  }

  verticalLayer.draw();
}
