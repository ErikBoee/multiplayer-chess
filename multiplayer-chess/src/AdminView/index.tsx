import { Button, Stack } from "@mui/material";
import { getGamePgn, startNewGame } from "../services";
import { Login } from "../Login";
import { useEffect, useState } from "react";

function AdminView() {
  const token = localStorage.getItem("token");
  const [gamePgn, setGamePgn] = useState<string | null>(null);
  console.log(token);
  if (!token) {
    return <Login />;
  }
  const handleGetGamePgn = async () => {
    const response = await getGamePgn();
    setGamePgn(response.pgn);
  };
  useEffect(() => {
    // Copy pgn to clipboard
    if (gamePgn) {
      console.log("Copying pgn to clipboard", gamePgn);
      navigator.clipboard.writeText(gamePgn);
    }
  }, [gamePgn]);

  return (
    <Stack
      direction="column"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Button onClick={startNewGame} variant="contained">
        New Game
      </Button>
      <Button onClick={handleGetGamePgn} variant="contained">
        Get pgn
      </Button>
      {gamePgn && <div>PGN copied to clipboard</div>}
    </Stack>
  );
}

export default AdminView;
