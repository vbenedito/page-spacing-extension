import { setupKeyListeners, setupClickListener } from "./content/listeners";
import { createButtons } from "./content/buttons";

console.log("Content Script activated!");

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "create_buttons") {
    setupKeyListeners();
    setupClickListener();
    createButtons();
  }
});
