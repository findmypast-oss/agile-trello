const baseUrl = "https://api.trello.com";
const token = ""; // see https://trello.com/app-key
const apiKey = "";
const authTokenParams = `key=${apiKey}&token=${token}`;

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    setTimeout(cardAge, 1000);
    setTimeout(cardTotalForColumns, 7000); // hacks -> wait for all columns to load
  }
};

const trelloUi = {
  getColumns() {
    return document.querySelectorAll(".list.js-list-content");
  },
  getCardsInColumn(column) {
    const cards = column.getElementsByClassName("list-cards");
    if (cards.length > 0) return cards[0].childNodes;
    return [];
  },
  getCardTitle(card) {
    return card.getElementsByClassName("list-card-title")[0].innerText;
  }
};

const STORY_POINTS_REGEX = /^\((\d+)\)/;

function extractPoints(title) {
  const points = title.match(STORY_POINTS_REGEX);
  if (points) return Number(points[1]);
  return 0;
}

function observeDomChanges() {
  let mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.className.includes("js-list-cards")) {
        // console.log(mutation);
        const column = mutation.target.parentNode;
        const totalsNode = column.getElementsByClassName(
          "agile-trello-col-totals"
        )[0];
        const points = totalPoints(column);
        totalsNode.innerText = updateColumnTotals({
          points,
          cardTotal: mutation.target.childNodes.length
        }).innerText;
      }
    });
  });
  const board = document.getElementsByClassName("board-main-content")[0];
  mutationObserver.observe(board, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
  });
}

function updateColumnTotals({ points, cardTotal }) {
  const colInfo = document.createElement("span");
  colInfo.setAttribute("class", "agile-trello-col-totals");
  colInfo.setAttribute(
    "style",
    "text-align:right;font-size: 12px;margin-right:10px;"
  );
  colInfo.innerText = "P: " + points + " T: " + cardTotal;
  return colInfo;
}

function totalPoints(node) {
  let points = 0;
  trelloUi.getCardsInColumn(node).forEach(function(node) {
    points += extractPoints(trelloUi.getCardTitle(node));
  });
  return points;
}

function cardTotalForColumns() {
  observeDomChanges();
  const columns = trelloUi.getColumns();
  columns.forEach(function(node) {
    const cardsContainer = node.getElementsByClassName("list-cards")[0];
    let points = totalPoints(node);
    node.insertBefore(
      updateColumnTotals({
        points,
        cardTotal: cardsContainer.childNodes.length
      }),
      cardsContainer
    );
  });
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
    colInfo.innerText = "Last Activity: " + cardDataById[id].dateLastActivity;
    card.append(colInfo);
  });
}
