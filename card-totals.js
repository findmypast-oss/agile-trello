import { trelloUi } from "./trello-ui.js";
import {
  cardListChanged,
  cardChanged,
  cardTitleChanged
} from "./board-events.js";

export function updateCardTotals(changedElements) {
  if (cardListChanged(changedElements)) {
    // change to column
    const cardContainer = changedElements.target;
    const column = cardContainer.parentNode;
    updateTotalColumnViews(column, cardContainer);
  }
  if (cardChanged(changedElements)) {
    // change to card
    const cardContainer = changedElements.target.parentNode;
    const column = cardContainer.parentNode;
    updateTotalColumnViews(column, cardContainer);
  }
  if (cardTitleChanged(changedElements)) {
    const cardContainer =
      changedElements.target.parentNode.parentNode.parentNode;
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
  let pointsWord = points === 1 ? " point" : " points";
  let cardTotalWord = cardTotal === 1 ? " ticket" : " tickets";
  colInfo.innerText = points + pointsWord + " / " + cardTotal + cardTotalWord;
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
  badgeInfo.setAttribute("title", "Story points");
  const storyPoints = document.createElement("span");
  storyPoints.setAttribute("class", "agile-trello-card-points badge-text");
  storyPoints.innerText = points;
  badgeInfo.appendChild(storyPoints);
  return badgeInfo;
}

export function estimatePointsForCards(changedElements) {
  if (cardChanged(changedElements)) {
    const card = changedElements.target;
    const points = extractPoints(trelloUi.getCardTitle(card));
    displayEstimatePoints(points, card);
  }

  if (cardTitleChanged(changedElements)) {
    const card = changedElements.target.parentNode.parentNode;
    const points = extractPoints(changedElements.target.innerText);
    displayEstimatePoints(points, card);
  }
}

function displayEstimatePoints(points, card) {
  const cardPointsElement = card.getElementsByClassName(
    "agile-trello-card-points"
  )[0];

  if (points > 0) {
    const newCardPoints = updateCardPoints({
      points
    });
    if (cardPointsElement) {
      cardPointsElement.innerText = newCardPoints.innerText;
    } else {
      card
        .getElementsByClassName("js-custom-field-badges")[0]
        .append(newCardPoints);
    }
  } else if (cardPointsElement) {
    cardPointsElement.parentNode.removeChild(cardPointsElement);
  }
}
