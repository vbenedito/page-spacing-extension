let lineIdCounter = 0;

export function addLine(type: "horizontal" | "vertical") {
  const line = document.createElement("div");
  line.dataset.id = `line-${lineIdCounter++}`;
  line.className = `page-ruler-line page-ruler-line--${type}`;

  if (type === "horizontal") {
    line.style.top = "50px";
    line.style.left = "0";
  } else {
    line.style.left = "50px";
    line.style.top = "0";
  }

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
