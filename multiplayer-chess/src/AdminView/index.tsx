import { Button, Stack } from "@mui/material";
import { startNewGame } from "../services";

function AdminView() {
  return (
    <Stack
      direction="row"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={startNewGame} variant="contained">
        New Game
      </Button>
    </Stack>
  );
}

export default AdminView;
