import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MasterView from "./MasterView";
import SuggesterView from "./SuggesterView";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/suggester" element={<SuggesterView />} />
          <Route path="/master" element={<MasterView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
