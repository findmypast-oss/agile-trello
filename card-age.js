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
      const daysSinceLastChange = daysBetween(
        new Date(cardDataById[id].dateLastActivity),
        new Date()
      );

      const cardAge = document.createElement("span");
      cardAge.setAttribute("class", "agile-trello-card-age");
      cardAge.innerText = `Last changed: ${daysSinceLastChange} day${
        daysSinceLastChange === 1 ? "" : "s"
      } ago`;
      card.append(cardAge);
    });
  }
}

function daysBetween(date1, date2) {
  var oneDay = 1000 * 60 * 60 * 24;
  var diff = date2.getTime() - date1.getTime();
  return Math.round(diff / oneDay);
}
