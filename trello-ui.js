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
  }
};
