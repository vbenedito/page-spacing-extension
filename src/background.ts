chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"],
    });

    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["App.css"],
    });

    chrome.tabs.sendMessage(tab.id, { action: "create_buttons" });
  }
});
