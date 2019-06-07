// Setup dynamic import
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL("agile-trello.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

chrome.storage.sync.get(
  {
    trelloToken: ""
  },
  function(items) {
    const globals = document.createElement("script");
    globals.setAttribute("type", "text/javascript");
    globals.innerText = `window.trelloToken = '${items.trelloToken}';`;
    head.insertBefore(globals, head.lastChild);
  }
);

chrome.runtime.onMessage.addListener(function(request, sender, _sendResponse) {
  if (request.action === "historyChange") {
    //TODO event fires multiple times when navigating to new URL, ideally we only want to
    // send one CustomEvent per board switch
    boardChanged();
  } else {
    configChanged(request);
  }
});

function boardChanged() {
  document.body.dispatchEvent(new CustomEvent("board-change", {}));
}

function configChanged(request) {
  var event = new CustomEvent("agile-popup-form", { detail: request });
  document.body.dispatchEvent(event);
}
