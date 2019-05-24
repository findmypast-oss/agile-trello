import { trelloUi } from "./trello-ui.js";

export function cardTotalForColumns() {
  const columns = trelloUi.getColumns();
  columns.forEach(function(node) {
    const cardsContainer = node.getElementsByClassName("list-cards")[0];
    let points = totalPoints(node);
    node.insertBefore(
      totalsView({
        points,
        cardTotal: cardsContainer.childNodes.length
      }),
      cardsContainer
    );
  });
}

export function updateCardTotals(cardContainer) {
  if (cardContainer.className.includes("js-list-cards")) {
    // console.log(mutation);
    const column = cardContainer.parentNode;
    const totalsNode = column.getElementsByClassName(
      "agile-trello-col-totals"
    )[0];

    const points = totalPoints(column);
    totalsNode.innerText = totalsView({
      points,
      cardTotal: cardContainer.childNodes.length
    }).innerText;
  }
}

function totalsView({ points, cardTotal }) {
  const colInfo = document.createElement("span");
  colInfo.setAttribute("class", "agile-trello-col-totals");
  colInfo.setAttribute(
    "style",
    "text-align:right;font-size: 12px;margin-right:10px;"
  );
  colInfo.innerText = "P: " + points + " C: " + cardTotal;
  return colInfo;
}

function totalPoints(node) {
  let points = 0;
  trelloUi.getCardsInColumn(node).forEach(function(node) {
    points += extractPoints(trelloUi.getCardTitle(node));
  });
  return points;
}

const STORY_POINTS_REGEX = /^\((\d+)\)/;

function extractPoints(title) {
  const points = title.match(STORY_POINTS_REGEX);
  if (points) return Number(points[1]);
  return 0;
}
