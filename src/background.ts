chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.log("Message from popup:", message);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.scripting.insertCSS({
        target: { tabId: tabs[0].id },
        files: ["App.css"],
      });

      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        console.log("Response from content script:", response);
        sendResponse(response);
      });
    }
  });

  // allowed async answer
  return true;
});
