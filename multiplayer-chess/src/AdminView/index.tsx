import { Button, Stack } from "@mui/material";
import { startNewGame } from "../services";
import { Login } from "../Login";

function AdminView() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return <Login />;
  }
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
