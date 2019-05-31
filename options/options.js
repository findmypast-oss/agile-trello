// Saves options to chrome.storage
function saveOptions() {
  var token = document.getElementById("token").value;
  chrome.storage.sync.set(
    {
      trelloToken: token
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get(
    {
      trelloToken: ""
    },
    function(items) {
      document.getElementById("token").value = items.trelloToken;
    }
  );
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
