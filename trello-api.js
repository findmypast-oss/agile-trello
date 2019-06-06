const baseUrl = "https://api.trello.com";
const token = window.trelloToken;
const apiKey = "38f080e1a2bac242619048df0787ee5c";
const authTokenParams = `key=${apiKey}&token=${token}`;

import cache from "./cache.js";

function diffInMs(date1, date2) {
  return Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
}

function msSinceLastFetch(date) {
  return diffInMs(date, new Date());
}

export const trelloApi = {
  async getAllCards(boardId) {
    if (token !== "" && apiKey !== "" && boardId !== "") {
      const storedBoard = cache.getObject(`board_${boardId}`);

      const timeDiff = storedBoard
        ? msSinceLastFetch(storedBoard.lastFetched)
        : 0;
      if (storedBoard && timeDiff < 10000) {
        return storedBoard.data;
      } else {
        const response = await fetch(
          `${baseUrl}/1/boards/${boardId}/cards?${authTokenParams}`
        );
        if (response.status === 200) {
          const data = await response.json();
          cache.setObject(`board_${boardId}`, {
            data: data,
            lastFetched: new Date()
          });

          data.map(card => {
            cache.setObject(`card_${card.shortLink}`, {
              data: card,
              lastFetched: new Date()
            });
          });

          return data;
        }
      }
    }
    return [];
  },

  async getCardDetails(cardId) {
    if (cardId && token !== "" && apiKey !== "" && cardId) {
      const storedCard = cache.getObject(`card_${cardId}`);
      const timeDiff = storedCard
        ? msSinceLastFetch(storedCard.lastFetched)
        : 0;
      if (storedCard && timeDiff < 30000) {
        return storedCard.data;
      } else {
        const response = await fetch(
          `${baseUrl}/1/cards/${cardId}?${authTokenParams}`
        );
        if (response.status === 200) {
          const data = await response.json();
          cache.setObject(`card_${cardId}`, {
            data: data,
            lastFetched: new Date()
          });
          return data;
        }
      }
    }
    return {};
  }
};
