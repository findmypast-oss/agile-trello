import { updateCardTotals, estimatePointsForCards } from "./card-totals.js";
const baseUrl = "https://api.trello.com";
const token = ""; //see https://trello.com/app-key
const apiKey = "";
const authTokenParams = `key=${apiKey}&token=${token}`;

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    setTimeout(cardAge, 2000);
    setTimeout(estimatePointsForCards, 7000);
  }
};

setupBoardObserver()();
function setupBoardObserver() {
  const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      updateCardTotals(mutation.target);
    });
  });
  return function observeDomChanges() {
    const board = document.getElementsByClassName("board-main-content")[0];
    if (board) {
      mutationObserver.observe(board, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });
    } else {
      setTimeout(observeDomChanges, 500);
    }
  };
}

async function cardAge() {
  const cards = document.querySelectorAll(".list-card");
  //TODO get the board id from the url
  const response = await fetch(
    baseUrl + "/1/boards/QPquSDva/cards?" + authTokenParams
  );
  const cardData = await response.json();
  const cardDataById = [];
  cardData.map(card => (cardDataById[card.shortLink] = card));
  cards.forEach(card => {
    const id = /https:\/\/trello.com\/c\/([A-Za-z0-9]+)\/\S+/.exec(
      card.href
    )[1];

    const colInfo = document.createElement("span");
    colInfo.setAttribute(
      "style",
      "text-align:right;font-size: 12px;margin-right:10px;"
    );
    colInfo.innerText =
      "Last changed: " +
      daysBetween(new Date(cardDataById[id].dateLastActivity), new Date()) +
      " days ago";
    card.append(colInfo);
  });

  function daysBetween(date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24;
    var diff = date2.getTime() - date1.getTime();
    return Math.round(diff / oneDay);
  }
}
