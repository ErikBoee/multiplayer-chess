import { Chess, Move } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { makeMove } from "../services";
import { clone } from "../utilities/clone";
import { Stack, Typography } from "@mui/material";

type InputMove = string | { from: string; to: string; promotion?: string };

type ChessboardWithRulesProps = {
  initialFen: string;
  onMove: (newFen: string) => void;
};

function ChessboardWithRules({ initialFen, onMove }: ChessboardWithRulesProps) {
  const [game, setGame] = useState(new Chess(initialFen));

  function makeAMove(move: InputMove) {
    const gameCopy = clone(game);
    const result = gameCopy.move(move);
    if (result === null) return null;
    setGame(gameCopy);
    return { result, newFen: gameCopy.fen() }; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    let move: { result: Move; newFen: string } | null = null;
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
    makeMove(move.result.san, move.newFen);
    onMove(move.newFen);
    return true;
  }

  return (
    <Stack
      direction="column"
      sx={{
        width: "30%",
        minWidth: 400,
        marginLeft: "5%",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="h5">{"GM Jon Ludvig Hammer"}</Typography>
      <Chessboard id="BasicBoard" position={game.fen()} onPieceDrop={onDrop} />
      <Typography variant="h5">{"Sustainable Procurement Summit"}</Typography>
    </Stack>
  );
}

export default ChessboardWithRules;
