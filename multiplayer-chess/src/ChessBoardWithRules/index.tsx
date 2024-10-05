import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";
import { clone } from "../utilities/clone";

type Move = string | { from: string; to: string; promotion?: string };

function ChessboardWithRules() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: Move) {
    const gameCopy = clone(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  return (
    <div style={{ width: "30vw", height: "30vh", marginTop: "100px" }}>
      <Chessboard id="BasicBoard" position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
}

export default ChessboardWithRules;
