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
import { UserProvider } from "./provider/UserProvider";
import { EventProvider } from "./provider/EventProvider";
import { ToDoProvider } from "./provider/todoProvider";

function App() {
  return (
    <UserProvider>
      <EventProvider>
        <ToDoProvider>
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
        </ToDoProvider>
      </EventProvider>
    </UserProvider>
  );
}

export default App;
