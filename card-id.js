import { trelloUrl } from "./trello-ui.js";

export function updateCardId(changedElement) {
  if (changedElement.classList.contains("list-card")) {
    showCardId(changedElement);
  }
}

function showCardId(card) {
  console.log(trelloUrl.getCardNumber(card.href));
}
