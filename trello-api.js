const baseUrl = "https://api.trello.com";
const token = ""; //see https://trello.com/app-key
const apiKey = "";
const authTokenParams = `key=${apiKey}&token=${token}`;

export const trelloApi = {
  async getAllCards(boardId) {
    const response = await fetch(
      `${baseUrl}/1/boards/${boardId}/cards?${authTokenParams}`
    );
    return await response.json();
  }
};
