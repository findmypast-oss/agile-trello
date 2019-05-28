import { trelloUi } from "./trello-ui.js";

export function updateCardTotals(changedElements) {
  if (changedElements.classList.contains("js-list-cards")) {
    // change to column
    const cardContainer = changedElements;
    const column = cardContainer.parentNode;
    updateTotalColumnViews(column, cardContainer);
  }
  if (changedElements.classList.contains("list-card")) {
    // change to card
    const cardContainer = changedElements.parentNode;
    const column = cardContainer.parentNode;
    updateTotalColumnViews(column, cardContainer);
  }
}

function updateTotalColumnViews(column, cardContainer) {
  const totalsNode = column.getElementsByClassName(
    "agile-trello-col-totals"
  )[0];
  const points = totalPoints(column);
  const newTotalsNode = totalsView({
    points,
    cardTotal: cardContainer.childNodes.length
  });
  if (totalsNode) {
    totalsNode.innerText = newTotalsNode.innerText;
  } else {
    column.insertBefore(newTotalsNode, cardContainer);
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

function updateCardPoints({ points }) {
  const cardInfo = document.createElement("span");
  cardInfo.setAttribute("class", "agile-trello-card-points");
  cardInfo.setAttribute(
    "style",
    "text-align:right;font-size: 12px;margin-right:10px;"
  );
  cardInfo.innerText = "P: " + points;
  return cardInfo;
}

export function estimatePointsForCards() {
  const cards = trelloUi.getAllCards();
  cards.forEach(function(card) {
    const cardBadgesContainer = card.getElementsByClassName(
      "list-card-details"
    )[0];
    const points = extractPoints(trelloUi.getCardTitle(card));

    card.insertBefore(
      updateCardPoints({
        points
      }),
      cardBadgesContainer
    );
  });
}
