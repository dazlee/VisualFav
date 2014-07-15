function getBookmarks(callback) {
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    callback(bookmarkTreeNodes);
  });
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
  console.log(message);
  console.log(sender);
  switch(message.method) {
    case "get":
      getBookmarks(function (bookmarkTreeNodes) {
        chrome.tabs.query({currentWindow:true, highlighted:true}, function (tabs) {
          console.log(tabs[0].url);
          var urlPatt = /.*127\.0\.0\.1.*/;
          if (urlPatt.test(tabs[0].url)) {
            chrome.tabs.sendMessage(tabs[0].id, bookmarkTreeNodes);
            //sendResponse(bookmarkTreeNodes);
          }
        });
      });
      break;
    case "remove":
        chrome.bookmarks.remove(message.id);
        sendResponse(message);
      break;
  }
});
