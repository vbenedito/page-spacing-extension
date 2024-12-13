import { styleButton } from "../utils/domUtils";
import { addLine } from "./lines";

const addHorizontalLineButton = document.createElement("button");
addHorizontalLineButton.textContent = "New horizontal line";
styleButton(addHorizontalLineButton, 10, "blue");
addHorizontalLineButton.addEventListener("click", () => addLine("horizontal"));

const addVerticalLineButton = document.createElement("button");
addVerticalLineButton.textContent = "New vertical line";
styleButton(addVerticalLineButton, 60, "green");
addVerticalLineButton.addEventListener("click", () => addLine("vertical"));

export const createLinesButtons = () => {
  document.body.appendChild(addHorizontalLineButton);
  document.body.appendChild(addVerticalLineButton);
  console.log("Buttons added to the page.");
};
