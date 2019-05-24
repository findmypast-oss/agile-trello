document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    setTimeout(cardTotalForColumns, 7000); // hacks -> wait for all columns to load
  }
};

const trelloUi = {
  getColumns() {
    return document.querySelectorAll(".list.js-list-content");
  },
  getCardsInColumn(column) {
    const cards = column.getElementsByClassName("list-cards");
    if (cards.length > 0) return cards[0].childNodes;
    return [];
  },
  getCardTitle(card) {
    return card.getElementsByClassName("list-card-title")[0].innerText;
  }
};

const STORY_POINTS_REGEX = /^\((\d+)\)/;

function extractPoints(title) {
  const points = title.match(STORY_POINTS_REGEX);
  if (points) return Number(points[1]);
  return 0;
}

function cardTotalForColumns() {
  const columns = trelloUi.getColumns();
  columns.forEach(function(node) {
    const cardsContainer = node.getElementsByClassName("list-cards")[0];
    let totalPoints = 0;
    trelloUi.getCardsInColumn(node).forEach(function(node) {
      totalPoints += extractPoints(trelloUi.getCardTitle(node));
    });
    const colInfo = document.createElement("span");
    colInfo.setAttribute(
      "style",
      "text-align:right;font-size: 12px;margin-right:10px;"
    );
    colInfo.innerText =
      "P: " + totalPoints + " T: " + cardsContainer.childNodes.length;
    node.insertBefore(colInfo, cardsContainer);
  });
}
