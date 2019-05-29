import { trelloUrl } from "./trello-ui.js";

export function updateCardId(changedElement) {
  if (changedElement.classList.contains("list-card")) {
    // console.log("TCL: updateCardId -> changedElement", changedElement);
    showCardId(changedElement);
  }
}

function showCardId(card) {
  const cardNumberElement = card.getElementsByClassName(
    "agile-trello-card-number"
  )[0];
  const newCardNumber = cardNumberView(card);
  if (cardNumberElement) {
    cardNumberElement.innerText = newCardNumber.innerText;
  } else {
    card.prepend(newCardNumber);
  }
}

function cardNumberView(card) {
  const trelloNumber = document.createElement("span");
  trelloNumber.setAttribute("class", "agile-trello-card-number");
  trelloNumber.innerText = trelloUrl.getCardNumber(card.getAttribute("href"));
  return trelloNumber;
}
