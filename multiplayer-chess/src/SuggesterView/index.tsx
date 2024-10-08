import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import ChessboardForSuggester from "../ChessBoardForSuggester";
import { getGame } from "../services";

const socketUrl = "ws://localhost:3000/";

function SuggesterView() {
  const [initialFen, setInitialFen] = useState<string | null>(null);

  const { lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    getGame()
      .then((game) => {
        setInitialFen(game.fen);
      })
      .catch((error) => {
        console.error("Error getting game", error);
      });
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage", lastMessage);
      setInitialFen(lastMessage.data);
    }
  }, [lastMessage]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {initialFen && <ChessboardForSuggester initialFen={initialFen} />}
    </div>
  );
}

export default SuggesterView;
