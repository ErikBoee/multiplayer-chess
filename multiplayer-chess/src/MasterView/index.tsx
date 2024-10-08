import { useEffect, useState } from "react";
import ChessboardWithRules from "../ChessBoardWithRules";
import { getGame, getSuggestions, startNewGame } from "../services";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://localhost:3000/";

function MasterView() {
  const [initialFen, setInitialFen] = useState<string | null>(null);

  const { sendMessage } = useWebSocket(socketUrl);
  const [suggestions, setSuggestions] = useState<Record<string, number>>({});

  useEffect(() => {
    getGame()
      .then((game) => {
        setInitialFen(game.fen);
      })
      .catch((error) => {
        console.error("Error getting game", error);
      });
  }, []);

  const onNewGame = () => {
    startNewGame();
    getGame().then((game) => {
      setInitialFen(game.fen);
    });
  };

  const onGetSuggestions = () => {
    getSuggestions().then((response) => {
      setSuggestions(response.suggestions);
    });
  };

  console.log("initialFen", initialFen);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {initialFen && (
        <ChessboardWithRules initialFen={initialFen} onMove={sendMessage} />
      )}
      <button onClick={onNewGame}>Start new game</button>
      <button onClick={onGetSuggestions}>Get suggestions</button>
      <div>
        {Object.entries(suggestions).map(([move, value]) => (
          <div key={move}>
            {move} - {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasterView;
