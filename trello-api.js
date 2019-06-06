const baseUrl = "https://api.trello.com";
const token = window.trelloToken;
const apiKey = "38f080e1a2bac242619048df0787ee5c";
const authTokenParams = `key=${apiKey}&token=${token}`;

function diffInMs(date1, date2) {
  return Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
}

function msSinceLastFetch(date) {
  return diffInMs(date, new Date());
}

function getObjectFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

function setObjectInLocalStorage(key, obj) {
  if (key && obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

export const trelloApi = {
  async getAllCards(boardId) {
    if (token !== "" && apiKey !== "" && boardId !== "") {
      const storedBoard = getObjectFromLocalStorage(`board_${boardId}`);

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
          setObjectInLocalStorage(`board_${boardId}`, {
            data: data,
            lastFetched: new Date()
          });

          data.map(card => {
            setObjectInLocalStorage(`card_${card.shortLink}`, {
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
      const storedCard = getObjectFromLocalStorage(`card_${cardId}`);
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
          setObjectInLocalStorage(`card_${cardId}`, {
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
