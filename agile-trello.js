import { updateCardTotals, estimatePointsForCards } from "./card-totals.js";
import { cardAge } from "./card-age.js";
import { updateCardId, showOpenCardId } from "./card-id.js";

setupBoardObserver()();
function setupBoardObserver() {
  const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      showOpenCardId(mutation);
      updateCardId(mutation);
      updateCardTotals(mutation);
      estimatePointsForCards(mutation);
      cardAge(mutation);
    });
  });
  return function observeDomChanges() {
    const board = document.getElementsByClassName("board-main-content")[0];
    const cardOpen = document.getElementsByClassName("window-overlay")[0];
    if (board && cardOpen) {
      mutationObserver.observe(board, {
        attributes: true,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
      });

      mutationObserver.observe(cardOpen, {
        attributes: true,
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
