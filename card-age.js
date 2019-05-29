import { trelloUi } from "./trello-ui.js";
import { trelloApi } from "./trello-api.js";

export async function cardAge() {
  const cards = trelloUi.getAllCards();
  const boardId = getBoardIdFromUrl(window.location.toString());
  const cardData = await trelloApi.getAllCards(boardId);
  const cardDataById = [];
  if (cardData.length > 0) {
    cardData.map(card => (cardDataById[card.shortLink] = card));
    cards.forEach(card => {
      const id = getCardIdFromUrl(card.href);

      const colInfo = document.createElement("span");
      colInfo.setAttribute(
        "style",
        "text-align:right;font-size: 12px;margin:10px;"
      );
      colInfo.innerText =
        "Last changed: " +
        daysBetween(new Date(cardDataById[id].dateLastActivity), new Date()) +
        " day(s) ago";
      card.append(colInfo);
    });
  }
}

function getBoardIdFromUrl(url) {
  return /https:\/\/trello.com\/b\/([A-Za-z0-9]+)\/\S+/.exec(url)[1];
}

function getCardIdFromUrl(url) {
  return /https:\/\/trello.com\/c\/([A-Za-z0-9]+)\/\S+/.exec(url)[1];
}

function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = date2.getTime() - date1.getTime();
  return Math.round(diff / oneDay);
}
