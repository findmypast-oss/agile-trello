export const trelloUi = {
  getColumns() {
    return document.querySelectorAll(".list.js-list-content");
  },
  getCardsInColumn(column) {
    const cards = column.getElementsByClassName("list-cards");
    if (cards.length > 0) return cards[0].childNodes;
    return [];
  },
  getCardTitle(card) {
    const titleNodes = card.getElementsByClassName("list-card-title");
    if (titleNodes.length > 0) return titleNodes[0].innerText;
    return "";
  },
  getAllCards() {
    const cards = document.querySelectorAll(".list-card");
    return cards;
  }
};

export const trelloUrl = {
  getBoardId(url) {
    return /https:\/\/trello.com\/b\/([A-Za-z0-9]+)\/\S+/.exec(url)[1];
  },

  getCardId(url) {
    return /https:\/\/trello.com\/c\/([A-Za-z0-9]+)\/\S+/.exec(url)[1];
  },

  getCardNumber(url) {
    // console.log("TCL: getCardNumber -> url", url);

    const lastUrlSegment = url.split("/").pop();
    return lastUrlSegment.substr(0, lastUrlSegment.indexOf("-"));
  }
};
