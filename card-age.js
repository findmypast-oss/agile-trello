import { trelloUi, trelloUrl } from "./trello-ui.js";
import { trelloApi } from "./trello-api.js";
import { cardChanged } from "./board-events.js";

export async function cardAge(changedElements) {
  if (cardChanged(changedElements)) {
    const card = changedElements.target;
    const cardId = trelloUrl.getCardId(card.href);
    const cardData = await trelloApi.getCardDetails(cardId);
    if (cardData != {}) {
      updateCardWithAge(card, cardData.dateLastActivity);
    }
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
      updateCardWithAge(card, cardDataById[id].dateLastActivity);
    });
  }
}

function updateCardWithAge(cardElement, cardLastActivity) {
  const daysSinceLastChange = daysBetween(
    new Date(cardLastActivity),
    new Date()
  );

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
