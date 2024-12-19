import { createLinesButtons } from "../content/buttons";
import { setupHoverListener } from "../content/hoverInfo";
import { setupClickListener, setupKeyListeners } from "../content/listeners";

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === "activeLinesButton") {
    createLinesButtons();
  } else if (message.action === "activeHoverInspect") {
    setupHoverListener();
  } else if (message.action === "activeMeasureDistance") {
    setupKeyListeners();
    setupClickListener();
  }
  sendResponse({ status: "Action executed" });
});
