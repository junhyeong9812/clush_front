import React from "react";
import TodoBoard from "../todo/TodoBoard";
import Calendar from "../calendar/calendar";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1000px",
        minWidth: "1000px",
      }}
    >
      <TodoBoard isDashboard={true} /> {/* 대시보드에서 칼럼 제한 */}
      <Calendar isDashboard={true} /> {/* 대시보드에서 캘린더만 표시 */}
    </div>
  );
};

export default Dashboard;
