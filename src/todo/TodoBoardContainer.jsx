import React from "react";
import { useMode } from "../theme"; // 테마 가져오기

export const TodoBoardContainer = ({ children, isDashboard }) => {
  const { theme } = useMode(); // 테마 가져오기

  return (
    <div
      style={{
        width: isDashboard ? "30%" : "100%",
        height: "100vh",
        display: "flex",
        overflowX: "auto",
        padding: "20px",
        minWidth: "800px",
        // maxWidth: "800px",
        // background: "#ffffff",
        // isDashboard가 true일 경우 너비 제한을 없앰
        minWidth: isDashboard ? "auto" : "800px",
        // maxWidth: isDashboard ? "auto" : "800px",
        background: theme.token.colorBgBase, // 테마 배경색 적용
        color: theme.token.colorTextBase, // 테마 텍스트 색상 적용
      }}
    >
      {children}
    </div>
  );
};
