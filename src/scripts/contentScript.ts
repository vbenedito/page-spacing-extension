import { createLinesButtons } from "../content/buttons";
import { setupHoverListener, setupKeyListeners } from "../content/listeners";

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "active_lines_buttons") {
    createLinesButtons();
  } else if (message.action === "active_hover_inspect") {
    setupKeyListeners();
    setupHoverListener();
  }

  sendResponse({ status: "Action executed" });
});
