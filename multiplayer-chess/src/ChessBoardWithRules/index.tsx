import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { makeMove } from "../services";
import { clone } from "../utilities/clone";

type Move = string | { from: string; to: string; promotion?: string };

type ChessboardWithRulesProps = {
  initialFen: string;
  onMove: (newFen: string) => void;
};

function ChessboardWithRules({ initialFen, onMove }: ChessboardWithRulesProps) {
  const [game, setGame] = useState(new Chess(initialFen));

  function makeAMove(move: Move) {
    const gameCopy = clone(game);
    const result = gameCopy.move(move);
    if (result === null) return null;
    setGame(gameCopy);
    return { result, newFen: gameCopy.fen() }; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // illegal move
    if (move === null) return false;
    makeMove(move.result.san, move.newFen);
    onMove(move.newFen);
    return true;
  }

  return (
    <div style={{ width: "30vw", height: "30vh", marginTop: "100px" }}>
      <Chessboard id="BasicBoard" position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
}

export default ChessboardWithRules;
