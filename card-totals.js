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
    "font-size:11px;font-weight:bold;margin-right:10px;text-align:right;"
  );
  colInfo.innerText = points + " points / " + cardTotal + " tickets";
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
  const badgeInfo = document.createElement("div");
  badgeInfo.setAttribute("class", "badge");
  badgeInfo.setAttribute("title", "Storypoints");
  const storyPoints = document.createElement("span");
  storyPoints.setAttribute("class", "agile-trello-card-points badge-text");
  storyPoints.setAttribute(
    "style",
    "background-color: #f03c02;border-radius: 50%;color: white;display: inline-block;font-size: 12px;height: 17px;line-height: 17px;margin-bottom:3px;padding: 0px;text-align:center;vertical-align: middle;width: 17px;"
  );
  storyPoints.innerText = points;
  badgeInfo.appendChild(storyPoints);
  return badgeInfo;
}

export function estimatePointsForCards(changedElements) {
  if (changedElements.classList.contains("list-card")) {
    const card = changedElements;
    const cardPointsElement = card.getElementsByClassName(
      "agile-trello-card-points"
    )[0];

    const points = extractPoints(trelloUi.getCardTitle(card));
    const newCardPoints = updateCardPoints({
      points
    });

    if (cardPointsElement) {
      cardPointsElement.innerText = newCardPoints.innerText;
    } else {
      card.getElementsByClassName("js-badges")[0].append(newCardPoints);
    }
  }
}
