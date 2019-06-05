import { trelloUi, trelloUrl } from "./trello-ui.js";
import { trelloApi } from "./trello-api.js";
import { cardChanged } from "./board-events.js";

export function clearCurrentBoardIdFromLocalStorage() {
  const boardId = trelloUrl.getBoardId(window.location.toString());
  localStorage.removeItem(boardId);
}

export function cardAge(changedElements) {
  const boardId = trelloUrl.getBoardId(window.location.toString());
  const boardLastFetched = localStorage.getItem(boardId);
  const timeSinceLastBoardFetch =
    new Date().getTime() - new Date(boardLastFetched).getTime();

  if (!boardLastFetched) {
    // if we don't have the board id yet, fetch all the cards in one call
    localStorage.setItem(boardId, new Date());
    updateAllCardsOnBoard();
  } else if (
    cardChanged(changedElements) &&
    //botch to ignore the initial page load mutation events
    timeSinceLastBoardFetch > 3000
  ) {
    const card = changedElements.target;
    const cardId = trelloUrl.getCardId(card.href);
    updateCard(card, cardId);
  }
}

async function updateCard(card, cardId) {
  const lastActivity = localStorage.getItem(cardId);

  // we either don't have the lastActivity in localStorage, or it's more than
  // a day old
  if (!lastActivity || daysBetween(new Date(lastActivity), new Date()) > 0) {
    const cardData = await trelloApi.getCardDetails(cardId);
    if (cardData != {} && cardData.dateLastActivity) {
      localStorage.setItem(cardId, cardData.dateLastActivity);
      updateCardWithAge(card, cardData.dateLastActivity);
    }
  } else if (lastActivity) {
    updateCardWithAge(card, lastActivity);
  }
}

async function updateAllCardsOnBoard() {
  const boardId = trelloUrl.getBoardId(window.location.toString());
  const cardData = await trelloApi.getAllCards(boardId);

  if (cardData.length > 0) {
    const cards = trelloUi.getAllCards();
    const cardDataById = [];
    cardData.map(card => (cardDataById[card.shortLink] = card));

    cards.forEach(card => {
      const id = trelloUrl.getCardId(card.href);
      if (cardDataById[id]) {
        const lastActivity = cardDataById[id].dateLastActivity;
        localStorage.setItem(id, lastActivity);
        updateCardWithAge(card, lastActivity);
      }
    });
  }
}

function updateCardWithAge(cardElement, cardLastActivity) {
  const daysSinceLastChange = daysBetween(
    new Date(cardLastActivity),
    new Date()
  );

  if (isNaN(daysSinceLastChange)) return;

  const cardAgeNode = cardElement.getElementsByClassName(
    "agile-trello-card-age"
  )[0];

  const newCardAgeNode = document.createElement("span");
  newCardAgeNode.setAttribute("class", "agile-trello-card-age");
  newCardAgeNode.innerText = `Last changed: ${daysSinceLastChange} day${
    daysSinceLastChange === 1 ? "" : "s"
  } ago`;

  if (cardAgeNode) {
    cardAgeNode.innerText = newCardAgeNode.innerText;
  } else {
    cardElement.append(newCardAgeNode);
  }
}

function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = date2.getTime() - date1.getTime();
  return Math.round(diff / oneDay);
}
