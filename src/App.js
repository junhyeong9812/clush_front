import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Calendar from "./calendar/calendar";
import Sidebar from "./sidebar/sidebar";
import { ThemeProvider, useMode } from "./theme";
import Dashboard from "./dashboard/dashboard";
import TodoBoard from "./todo/TodoBoard";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/TodoBoard" element={<TodoBoard />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
