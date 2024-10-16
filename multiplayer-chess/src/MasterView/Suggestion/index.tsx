import { Stack, Typography } from "@mui/material";
import pawn from "./pieces/pawn.png";
import queen from "./pieces/queen.png";
import rook from "./pieces/rook.png";
import knight from "./pieces/knight.png";
import bishop from "./pieces/bishop.png";
import king from "./pieces/king.png";

const moveToImageAndMove = (move: string) => {
  if (move.startsWith("Q")) return { image: queen, move: move.slice(1) };
  if (move.startsWith("R")) return { image: rook, move: move.slice(1) };
  if (move.startsWith("N")) return { image: knight, move: move.slice(1) };
  if (move.startsWith("B")) return { image: bishop, move: move.slice(1) };
  if (move.startsWith("K")) return { image: king, move: move.slice(1) };
  return { image: pawn, move };
};

type SuggestionProps = {
  suggestion: string;
  numberOfVotes: number;
  maxNumberOfVotes: number;
};

function Suggestion({
  suggestion,
  numberOfVotes,
  maxNumberOfVotes,
}: SuggestionProps) {
  const barWidth = (numberOfVotes / maxNumberOfVotes) * 300;
  const { image, move } = moveToImageAndMove(suggestion);
  return (
    <Stack direction="row" alignItems={"center"} gap={2}>
      <Stack
        direction="row"
        width={"130px"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        {suggestion.includes("O-") ? (
          <div style={{ width: "10px" }} />
        ) : (
          <img width="50px" src={image} alt="pawn" />
        )}
        <Typography variant="h4" marginBottom={-1}>
          {move}
        </Typography>
      </Stack>
      <Stack
        style={{
          width: barWidth,
          height: 30,
          backgroundColor: "lightgray",
        }}
      />
      <Typography variant={"h4"}>{numberOfVotes}</Typography>
    </Stack>
  );
}

export default Suggestion;
