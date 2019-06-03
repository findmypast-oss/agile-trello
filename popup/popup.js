window.addEventListener("load", function() {
  let popupForm = document.getElementById("agileConfig");
  function sendData() {
    let agileConfig = new FormData(popupForm);
    // console.log("TCL: sendData -> form", popupForm, agileConfig);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        primary: agileConfig.get("primary")
      });
    });
  }

  popupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sendData();
  });
});
