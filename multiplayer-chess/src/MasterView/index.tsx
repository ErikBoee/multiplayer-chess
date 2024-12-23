import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import ChessboardWithRules from "../ChessBoardWithRules";
import { getGame, getSuggestions } from "../services";
import Suggestion from "./Suggestion";
import ColoredCircle from "./ColoredCircle";
import { Login } from "../Login";
import CountdownTimer from "../Countdown";
import QrCode from "./QrCode/d389de9e-a8d0-4372-bf07-93865f996225.jpeg";

const socketUrl = "wss://multiplayer-chess-28726487310.europe-north1.run.app/";

function MasterView() {
  const [initialFen, setInitialFen] = useState<string | null>(null);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (_closeEvent) => true,
  });
  const [suggestions, setSuggestions] = useState<Record<string, number>>({});

  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return <Login />;
  }

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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sortedSuggestions = Object.entries(suggestions)
    .sort(([, votesA], [, votesB]) => votesB - votesA)
    .slice(0, 8);

  const maxNumberOfVotes = sortedSuggestions[0]?.[1] ?? 0;

  const suggestionMessage =
    Object.entries(suggestions).length > 8
      ? "Top 8 suggestions from audience:"
      : "Suggestions from the audience:";
  return (
    <Stack
      direction="column"
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            marginRight: "-150px",
          }}
        >
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            {readyState === 1 ? (
              <ColoredCircle color="green" />
            ) : (
              <ColoredCircle color="red" />
            )}
            <Typography variant="h4">{suggestionMessage}</Typography>
          </Stack>
          {sortedSuggestions.map(([move, value]) => (
            <Suggestion
              suggestion={move}
              numberOfVotes={value}
              maxNumberOfVotes={maxNumberOfVotes}
            />
          ))}
        </Stack>
        <Stack
          direction="column"
          gap={10}
          justifyContent={"space-between"}
          minHeight={"70%"}
          marginRight={"20px"}
        >
          <Stack direction="column" gap={1}>
            <Typography variant="h4">Time left:</Typography>
            <CountdownTimer />
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="h4" marginLeft={2}>
              Scan to join!
            </Typography>
            <img width={"240px"} src={QrCode} alt="qr code" />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4">Join the team:</Typography>
      </Stack>
      <Stack direction="row" gap={1} marginBottom={5} alignItems="center">
        <Typography variant="h4" color="blue">
          https://sjakkevents.no/suggester
        </Typography>
      </Stack>
    </Stack>
  );
}

export default MasterView;
