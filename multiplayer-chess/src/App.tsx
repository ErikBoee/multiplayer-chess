import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MasterView from "./MasterView";
import SuggesterView from "./SuggesterView";
import HomePage from "./HomePage";
import { Stack } from "@mui/material";
import AdminView from "./AdminView";

function App() {
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suggester" element={<SuggesterView />} />
          <Route path="/master" element={<MasterView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </Router>
    </Stack>
  );
}

export default App;
