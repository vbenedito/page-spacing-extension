chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"], // Injetar o script de conteúdo
    });
    chrome.tabs.sendMessage(tab.id, { action: "create_buttons" });
  }
});
