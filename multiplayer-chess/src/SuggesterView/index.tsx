import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import ChessboardForSuggester from "../ChessBoardForSuggester";
import { getGame } from "../services";
import { Stack } from "@mui/material";

const socketUrl = "wss://multiplayer-chess-28726487310.europe-north1.run.app/";

function SuggesterView() {
  const [initialFen, setInitialFen] = useState<string | null>(null);

  const fetchAndSetInitialFen = async () => {
    try {
      const game = await getGame();
      setInitialFen(game.fen);
    } catch (error) {
      console.error("Error getting game", error);
    }
  };

  const { lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (_closeEvent) => true,
  });

  useEffect(() => {
    fetchAndSetInitialFen();
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage", lastMessage);
      setInitialFen(lastMessage.data);
    }
  }, [lastMessage]);

  return (
    <Stack
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initialFen && <ChessboardForSuggester initialFen={initialFen} />}
    </Stack>
  );
}

export default SuggesterView;
