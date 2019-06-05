const baseUrl = "https://api.trello.com";
const token = window.trelloToken;
const apiKey = "38f080e1a2bac242619048df0787ee5c";
const authTokenParams = `key=${apiKey}&token=${token}`;

export const trelloApi = {
  async getAllCards(boardId) {
    if (token !== "" && apiKey !== "" && boardId !== "") {
      const response = await fetch(
        `${baseUrl}/1/boards/${boardId}/cards?${authTokenParams}`
      );
      if (response.status === 200) {
        return await response.json();
      }
    }
    return [];
  },

  async getCardDetails(cardId) {
    if (cardId && token !== "" && apiKey !== "") {
      const response = await fetch(
        `${baseUrl}/1/cards/${cardId}?${authTokenParams}`
      );
      if (response.status === 200) {
        return await response.json();
      }
    }
    return {};
  }
};
