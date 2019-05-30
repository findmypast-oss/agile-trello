import { trelloUi, trelloUrl } from "./trello-ui.js";
import { trelloApi } from "./trello-api.js";

export async function cardAge() {
  const boardId = trelloUrl.getBoardId(window.location.toString());
  const cardData = await trelloApi.getAllCards(boardId);

  if (cardData.length > 0) {
    const cards = trelloUi.getAllCards();
    const cardDataById = [];
    cardData.map(card => (cardDataById[card.shortLink] = card));

    cards.forEach(card => {
      const id = trelloUrl.getCardId(card.href);

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

function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = date2.getTime() - date1.getTime();
  return Math.round(diff / oneDay);
}
