import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Calendar from "./calendar/calendar";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
