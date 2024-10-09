import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import ChessboardWithRules from "../ChessBoardWithRules";
import { getGame, getSuggestions } from "../services";
import Suggestion from "./Suggestion";

const socketUrl = "wss://multiplayer-chess-28726487310.europe-north1.run.app/";

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

  const onGetSuggestions = () => {
    getSuggestions().then((response) => {
      setSuggestions(response.suggestions);
    });
  };

  useEffect(() => {
    onGetSuggestions();

    const interval = setInterval(() => {
      onGetSuggestions();
      console.log("polling suggestions");
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const sortedSuggestions = Object.entries(suggestions)
    .sort(([, votesA], [, votesB]) => votesB - votesA)
    .slice(0, 10);

  const maxNumberOfVotes = sortedSuggestions[0]?.[1] ?? 0;

  const suggestionMessage =
    Object.entries(suggestions).length > 10
      ? "Top 10 suggestions from audience:"
      : "Suggestions from the audience:";
  return (
    <Stack
      direction="row"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
      }}
    >
      {initialFen && (
        <ChessboardWithRules
          initialFen={initialFen}
          onMove={(newFen: string) => {
            sendMessage(newFen);
            onGetSuggestions();
          }}
        />
      )}
      <Stack
        direction="column"
        sx={{
          justifyContent: "start",
          alignItems: "start",
          minHeight: "70%",
          width: "50%",
          gap: 1,
          marginRight: "-200px",
        }}
      >
        <Typography variant="h4">{suggestionMessage}</Typography>
        {sortedSuggestions.map(([move, value]) => (
          <Suggestion
            suggestion={move}
            numberOfVotes={value}
            maxNumberOfVotes={maxNumberOfVotes}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default MasterView;
