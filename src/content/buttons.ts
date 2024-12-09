import { styleButton } from "../utils/domUtils";
import { addLine } from "./lines";

const addHorizontalLineButton = document.createElement("button");
addHorizontalLineButton.textContent = "Add Horizontal Line";
styleButton(addHorizontalLineButton, 10, "blue");
addHorizontalLineButton.addEventListener("click", () => addLine("horizontal"));

const addVerticalLineButton = document.createElement("button");
addVerticalLineButton.textContent = "Add Vertical Line";
styleButton(addVerticalLineButton, 50, "green");
addVerticalLineButton.addEventListener("click", () => addLine("vertical"));

export const createButtons = () => {
  document.body.appendChild(addHorizontalLineButton);
  document.body.appendChild(addVerticalLineButton);
  console.log("Buttons added to the page.");
};
