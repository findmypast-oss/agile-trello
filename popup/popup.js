window.addEventListener("load", function() {
  let popupForm = document.getElementById("agileConfig");
  getSavedValues(values => {
    sendDataToTab(values);
    setFormValues(popupForm, values);
  });

  popupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const values = getFormValues(popupForm);
    saveValues(values);
    sendDataToTab(values);
  });
});

function sendDataToTab(values) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, values);
  });
}

function getFormValues(formElement) {
  if (formElement) {
    let agileConfig = new FormData(formElement);
    return {
      idForeground: agileConfig.get("idForeground"),
      pointsBackground: agileConfig.get("pointsBackground")
    };
  }
  return null;
}

function setFormValues(formElement, values) {
  for (let i = 0; i < formElement.length; i++) {
    const input = formElement[i];
    if (Object.keys(values).includes(input.id)) {
      input.value = values[input.id];
    }
  }
}

function getSavedValues(fn) {
  chrome.storage.sync.get(["idForeground", "pointsBackground"], fn);
}

function saveValues({ idForeground, pointsBackground }) {
  chrome.storage.sync.set({ idForeground, pointsBackground });
}
