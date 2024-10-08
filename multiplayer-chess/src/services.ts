const url = "http://localhost:3000/";

async function makeSuggestion(move: string): Promise<void> {
  return fetch(`${url}add-suggestion/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      move,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR!");
    }
    return response.json();
  });
}

async function makeMove(move: string, newFen: string): Promise<void> {
  return fetch(`${url}make-move/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      move,
      newFen,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR!");
    }
    return response.json();
  });
}

async function startNewGame(): Promise<void> {
  return fetch(`${url}new-game/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR!");
    }
    return response.json();
  });
}

interface SuggestionsResponse {
  suggestions: Record<string, number>;
}

async function getSuggestions(): Promise<SuggestionsResponse> {
  return fetch(`${url}get-suggestions/`).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR!");
    }
    return response.json();
  });
}

interface GameResponse {
  fen: string;
}

async function getGame(): Promise<GameResponse> {
  return fetch(`${url}get-current-game/`).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR!");
    }
    return response.json();
  });
}

export { makeSuggestion, makeMove, startNewGame, getSuggestions, getGame };
