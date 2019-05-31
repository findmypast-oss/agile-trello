const baseUrl = "https://api.trello.com";
const token = ""; //see https://trello.com/app-key
const apiKey = "";
const authTokenParams = `key=${apiKey}&token=${token}`;

export const trelloApi = {
  async getAllCards(boardId) {
    if (token !== "" && apiKey !== "") {
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
    if (token !== "" && apiKey !== "") {
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
