import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { clone } from "../utilities/clone";
import { makeSuggestion } from "../services";

type Move = string | { from: string; to: string; promotion?: string };

type ChessboardForSuggesterProps = {
  initialFen: string;
};

function ChessboardForSuggester({ initialFen }: ChessboardForSuggesterProps) {
  const [suggestedFen, setSuggestedFen] = useState<string | null>(null);
  const [game, setGame] = useState(new Chess(initialFen));
  const [hasMadeSuggestion, setHasMadeSuggestion] = useState(false);

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
    makeSuggestion(move.san);
    setHasMadeSuggestion(true);
    setSuggestedFen(game.fen());
    return true;
  }

  useEffect(() => {
    setSuggestedFen(null);
    setGame(new Chess(initialFen));
    setHasMadeSuggestion(false);
  }, [initialFen]);
  if (hasMadeSuggestion) {
    return (
      <div style={{ width: "30vw", height: "30vh", marginTop: "100px" }}>
        Takk for ditt forslag! Ny mulighet dukker opp på neste trekk.
      </div>
    );
  }
  const dbPassword = "maudi123"

  return (
    <div style={{ width: "30vw", height: "30vh", marginTop: "100px" }}>
      <Chessboard
        id="BasicBoard"
        position={suggestedFen ?? initialFen}
        onPieceDrop={onDrop}
      />
    </div>
  );
}

export default ChessboardForSuggester;
