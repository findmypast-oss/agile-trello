import { trelloUrl } from "./trello-ui.js";
import {
  cardLinkChanged,
  cardOpened,
  cardOpenedAlready
} from "./board-events.js";

export function updateCardId(changedElement) {
  if (cardLinkChanged(changedElement)) {
    showCardId(changedElement.target);
  }
}

export function showOpenCardId(changedElement) {
  if (cardOpened(changedElement)) {
    addOpenCardId(changedElement.target);
  }
  if (cardOpenedAlready(changedElement)) {
    const cardAlreadyOpen = document.getElementsByClassName(
      "card-detail-window"
    )[0];
    if (cardAlreadyOpen) addOpenCardId(cardAlreadyOpen);
  }
}

const OPEN_CARD_CSS_CLASS = "agile-trello-open-card-number";
const BOARD_CARD_CSS_CLASS = "agile-trello-card-number";

function addOpenCardId(card) {
  const cardNumberElement = card.getElementsByClassName(OPEN_CARD_CSS_CLASS)[0];
  const newCardNumber = cardNumberView(card.baseURI, OPEN_CARD_CSS_CLASS);
  if (cardNumberElement) {
    cardNumberElement.innerText = newCardNumber.innerText;
  } else {
    card.prepend(newCardNumber);
  }
}

function showCardId(card) {
  const cardNumberElement = card.getElementsByClassName(
    BOARD_CARD_CSS_CLASS
  )[0];
  const newCardNumber = cardNumberView(
    card.getAttribute("href"),
    BOARD_CARD_CSS_CLASS
  );
  if (cardNumberElement) {
    cardNumberElement.innerText = newCardNumber.innerText;
  } else {
    card.prepend(newCardNumber);
  }
}

function cardNumberView(cardUrl, cssClass) {
  const trelloNumber = document.createElement("div");
  trelloNumber.setAttribute("class", cssClass);
  trelloNumber.innerText = "#" + trelloUrl.getCardNumber(cardUrl);
  return trelloNumber;
}
