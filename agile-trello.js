import { updateCardTotals, estimatePointsForCards } from "./card-totals.js";
import { cardAge } from "./card-age.js";
import { updateCardId } from "./card-id.js";

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    setTimeout(cardAge, 2000);
  }
};

setupBoardObserver()();
function setupBoardObserver() {
  const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      updateCardId(mutation.target);
      updateCardTotals(mutation.target);
      estimatePointsForCards(mutation.target);
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
