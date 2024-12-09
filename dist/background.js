chrome.action.onClicked.addListener(async e=>{e.id&&(await chrome.scripting.executeScript({target:{tabId:e.id},files:["contentScript.js"]}),chrome.tabs.sendMessage(e.id,{action:"create_buttons"}))});
