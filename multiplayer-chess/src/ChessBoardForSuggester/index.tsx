import { Stack, Typography } from "@mui/material";
import { Chess, Move } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { makeSuggestion } from "../services";
import { clone } from "../utilities/clone";
import { getIsMobile } from "../utilities/isMobile";

type InputMove = string | { from: string; to: string; promotion?: string };

type ChessboardForSuggesterProps = {
  initialFen: string;
};

function ChessboardForSuggester({ initialFen }: ChessboardForSuggesterProps) {
  const [suggestedFen, setSuggestedFen] = useState<string | null>(null);
  const [game, setGame] = useState(new Chess(initialFen));
  console.log(initialFen);
  const [isWhitesTurn, setIsWhitesTurn] = useState(
    initialFen.split(" ")[1] === "w"
  );
  const [hasMadeSuggestion, setHasMadeSuggestion] = useState(false);

  function makeAMove(move: InputMove) {
    const gameCopy = clone(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    let move: Move | null = null;
    try {
      move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    } catch (e) {
      return false;
    }
    // illegal move
    if (move === null) return false;
    makeSuggestion(move.san);
    setHasMadeSuggestion(true);
    setSuggestedFen(game.fen());
    setIsWhitesTurn(!isWhitesTurn);
    return true;
  }

  useEffect(() => {
    setSuggestedFen(null);
    setGame(new Chess(initialFen));
    setIsWhitesTurn(initialFen.split(" ")[1] === "w");
    setHasMadeSuggestion(false);
  }, [initialFen]);

  const isMobile = getIsMobile(window.navigator.userAgent);

  const style = isMobile ? { width: "92%" } : { width: "27%", minWidth: 350 };
  if (isMobile) {
    return (
      <Stack
        direction="column"
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack
          direction="column"
          sx={{
            ...style,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!hasMadeSuggestion && (
            <Typography variant="h4" align="center">
              {isWhitesTurn ? "White to move" : "Black to move"}
            </Typography>
          )}
          <Typography variant="h4" align="center">
            {suggestedFen
              ? "Your suggestion has been registered"
              : isWhitesTurn
              ? "Suggest a move"
              : "Opponent's turn"}
          </Typography>
        </Stack>
        <Stack sx={{ ...style, justifyContent: "center" }}>
          <Chessboard
            id="BasicBoard"
            position={suggestedFen ?? initialFen}
            onPieceDrop={onDrop}
            arePiecesDraggable={isWhitesTurn && !hasMadeSuggestion}
          />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Stack
        direction="column"
        sx={{
          ...style,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!hasMadeSuggestion && (
          <Typography variant="h4" align="center">
            {isWhitesTurn ? "White to move" : "Black to move"}
          </Typography>
        )}
        <Typography variant="h4" align="center">
          {suggestedFen
            ? "Your suggestion has been registered"
            : isWhitesTurn
            ? "Suggest a move"
            : "Jon Ludvig's turn"}
        </Typography>
      </Stack>
      <Stack sx={{ ...style, justifyContent: "center" }}>
        <Chessboard
          id="BasicBoard"
          position={suggestedFen ?? initialFen}
          onPieceDrop={onDrop}
          arePiecesDraggable={isWhitesTurn && !hasMadeSuggestion}
          onPieceDragEnd={onDrop}
        />
      </Stack>
    </Stack>
  );
}

export default ChessboardForSuggester;
