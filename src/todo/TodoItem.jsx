import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useMode } from "../theme"; // 테마 가져오기

export const TodoItem = ({ id, children, onClick }) => {
  const { theme } = useMode(); // 테마 가져오기
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef} // 드래그 가능하게 설정
      {...listeners} // 드래그 이벤트 리스너
      {...attributes} // 드래그 속성
      style={{
        cursor: "grab",
        marginBottom: "10px",
        background: theme.token.colorBgContainer, // 테마 배경색
        color: theme.token.colorTextBase, // 테마 텍스트 색상
        borderRadius: "4px",
        padding: "10px",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
