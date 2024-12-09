import { calculateLinesDistance } from "../utils/distanceLine";
import { isKeyPressed, state } from "./state";

let lineIdCounter = 0;

export function addLine(type: "horizontal" | "vertical") {
  const line = document.createElement("div");
  line.dataset.id = `line-${lineIdCounter++}`;
  line.style.position = "absolute";
  line.style.zIndex = "9999";
  line.style.cursor = "move";
  line.style.backgroundColor = type === "horizontal" ? "red" : "blue";

  if (type === "horizontal") {
    line.style.top = "50px";
    line.style.left = "0";
    line.style.width = "100%";
    line.style.height = "2px";
  } else {
    line.style.left = "50px";
    line.style.top = "0";
    line.style.width = "2px";
    line.style.height = "100%";
  }

  // Handle click to select line
  line.addEventListener("click", () => {
    if (isKeyPressed.value) {
      handleLineSelection(line);
    } else {
      console.log("Key not pressed, ignoring click.");
    }
  });

  addDragBehavior(line, type);
  document.body.appendChild(line);
}

function addDragBehavior(line: HTMLElement, type: "horizontal" | "vertical") {
  let isDragging = false;
  let startCoord = 0;

  line.addEventListener("mousedown", (e) => {
    isDragging = true;
    startCoord = type === "horizontal" ? e.clientY : e.clientX;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const delta =
      type === "horizontal" ? e.clientY - startCoord : e.clientX - startCoord;
    const currentPosition = parseInt(
      line.style[type === "horizontal" ? "top" : "left"],
      10
    );

    line.style[type === "horizontal" ? "top" : "left"] = `${
      currentPosition + delta
    }px`;
    startCoord = type === "horizontal" ? e.clientY : e.clientX;
  });

  document.addEventListener("mouseup", () => (isDragging = false));
}

function handleLineSelection(line: HTMLElement) {
  if (!state.firstSelectedLine) {
    state.firstSelectedLine = line;
    console.log(`First line selected: ${line.dataset.id}`);
  } else if (!state.secondSelectedLine && line !== state.firstSelectedLine) {
    state.secondSelectedLine = line;
    console.log(`Second line selected: ${line.dataset.id}`);
    calculateLinesDistance(state.firstSelectedLine, state.secondSelectedLine);
    state.resetSelections();
  }
}
