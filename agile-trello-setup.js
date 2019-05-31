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
