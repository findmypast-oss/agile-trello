import { trelloUrl } from "./trello-ui.js";

export function updateCardId(changedElement) {
  if (
    changedElement.target.classList.contains("list-card") &&
    changedElement.type === "attributes" &&
    changedElement.attributeName === "href"
  ) {
    showCardId(changedElement.target);
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
  const trelloNumber = document.createElement("div");
  trelloNumber.setAttribute("class", "agile-trello-card-number");
  trelloNumber.innerText =
    "#" + trelloUrl.getCardNumber(card.getAttribute("href"));
  return trelloNumber;
}
