import React from "react";
import { useMode } from "../theme"; // 테마 가져오기

export const TodoBoardContainer = ({ children }) => {
  const { theme } = useMode(); // 테마 가져오기

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflowX: "auto",
        padding: "20px",
        minWidth: "800px",
        maxWidth: "800px",
        background: "#ffffff",
        background: theme.token.colorBgBase, // 테마 배경색 적용
        color: theme.token.colorTextBase, // 테마 텍스트 색상 적용
      }}
    >
      {children}
    </div>
  );
};
