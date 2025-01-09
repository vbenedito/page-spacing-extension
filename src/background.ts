import { ACTIONS } from "./utils/constants";

const injectCSSFile = (action: string) => {
  console.log({ action });
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      injectCSSFile(message.action as string);

      if (message.action === ACTIONS.activeLinesButton) {
        chrome.scripting.insertCSS({
          target: { tabId: tabs[0].id },
          files: ["App.css"],
        });
      }

      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        sendResponse(response);
      });
    }
  });

  // allowed async answer
  return true;
});
