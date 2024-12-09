// src/contentScript.ts
import { setupKeyListeners, setupClickListener } from "./content/listeners";
import { createButtons } from "./content/buttons";

console.log("Content Script activated!");

// import { createButtons } from "./content/buttons";
// import { setupKeyPressListeners } from "./content/events";

// console.log("Content Script activated!");
// setupKeyPressListeners();

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "create_buttons") {
    setupKeyListeners();
    setupClickListener();
    createButtons();
  }
});
