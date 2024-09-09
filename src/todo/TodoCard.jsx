import React from "react";
import { Card } from "antd";
import { useMode } from "../theme"; // 테마 가져오기

export const TodoCard = ({ task }) => {
  const { theme } = useMode(); // 테마 가져오기

  return (
    <Card
      title={task.title} // 할 일의 제목을 보여줌
      style={{
        marginBottom: "10px",
        background: theme.token.colorBgBase, // 테마 배경색
        color: theme.token.colorTextBase, // 테마 텍스트 색상
      }}
    >
      <p>{task.description}</p> {/* 할 일의 설명을 보여줌 */}
    </Card>
  );
};
