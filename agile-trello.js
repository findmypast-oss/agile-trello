document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    setTimeout(cardTotalForColumns, 7000); // hacks -> wait for all columns to load
  }
};

function cardTotalForColumns() {
  const columns = document.querySelectorAll(".list.js-list-content");
  columns.forEach(function(node) {
    const cardsContainer = node.getElementsByClassName("list-cards")[0];
    const colInfo = document.createElement("span");
    colInfo.setAttribute(
      "style",
      "text-align:right;font-size: 12px;margin-right:10px;"
    );
    colInfo.innerText = "Total: " + cardsContainer.childNodes.length;
    node.insertBefore(colInfo, cardsContainer);
  });
}
