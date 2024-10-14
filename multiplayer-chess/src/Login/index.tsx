import { useState } from "react";
import { Stack, Input, Button, CircularProgress, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Feil passord!");
          } else if (res.status === 404) {
            throw new Error("Brukeren finnes ikke!");
          } else {
            throw new Error("Noe gikk galt!");
          }
        }
        res.json().then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          window.location.reload();
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setError(error);
      });
  };

  if (loading) {
    return (
      <Stack
        direction={"column"}
        gap={4}
        sx={{
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <Stack
      direction={"column"}
      gap={4}
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={onSubmit}>
        Login
      </Button>
      {error && (
        <Alert color="error" icon={<Close />}>
          {" "}
          {error.message}{" "}
        </Alert>
      )}
    </Stack>
  );
};
