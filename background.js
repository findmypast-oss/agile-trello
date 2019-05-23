chrome.tabs.onActivated.addListener(run);
// chrome.tabs.onUpdated.addListener(function(_tabId, info, tab) {
//   if (info.status == "complete") run(tab);
// });

function run(tab) {
  chrome.tabs.get(tab.tabId, function(tab) {
    if (tab.url && tab.url.indexOf("https://trello.com") > -1) {
      runApp();
    }
  });
}

function runApp() {
  console.log(document);
  let cards = document.querySelectorAll(".list-card, .ui-droppable");
  console.log("Extension: ", cards);
}
