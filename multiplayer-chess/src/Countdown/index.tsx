import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";

const CountdownTimer = () => {
  // Initial time in seconds (1 hour)
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log("Countdown complete!");
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  if (timeRemaining === 0) {
    return (
      <Stack
        direction="column"
        alignItems="end"
        width="50px"
        justifyContent={"end"}
      >
        <Button
          onClick={() => setTimeRemaining(30)}
          sx={{ width: "10px", color: "black" }}
        >
          30s
        </Button>
        <Button
          onClick={() => setTimeRemaining(60)}
          sx={{ width: "10px", color: "black" }}
        >
          60s
        </Button>
        <Button
          onClick={() => setTimeRemaining(90)}
          sx={{ width: "10px", color: "black" }}
        >
          90s
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" width="50px">
      <Typography variant="h1">{timeRemaining}</Typography>
    </Stack>
  );
};

export default CountdownTimer;
