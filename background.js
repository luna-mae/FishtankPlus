chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['libs/arrive.js', 'libs/keycode.js', 'content.js'],
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to execute content script:', chrome.runtime.lastError);
        } else if (results && results.length > 0 && results[0].result === undefined) {
          console.error('Failed to execute content script. The script might be empty or contain errors.');
        } else {
          console.log('Content script executed successfully:', results);
        }
      });
    }
  });
});
