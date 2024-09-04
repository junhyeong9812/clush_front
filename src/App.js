import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Calendar from "./calendar/calendar";
import Sidebar from "./sidebar/sidebar";
import { ThemeProvider, useMode } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Calendar />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
