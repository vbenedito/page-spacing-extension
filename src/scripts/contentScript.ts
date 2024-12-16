import { createLinesButtons } from "../content/buttons";
import { setupHoverListener } from "../content/hoverInfo";
import { setupClickListener, setupKeyListeners } from "../content/listeners";

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "active_lines_buttons") {
    createLinesButtons();
  } else if (message.action === "active_hover_inspect") {
    setupHoverListener();
  } else if (message.action === "active_measure_distance") {
    setupKeyListeners();
    setupClickListener();
  }
  sendResponse({ status: "Action executed" });
});
