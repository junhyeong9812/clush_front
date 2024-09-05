import React from "react";
import { useDroppable } from "@dnd-kit/core"; // 드롭 가능하게 설정
import { Button } from "antd";
import { useMode } from "../theme"; // 테마 가져오기

export const TodoColumn = ({ id, title, onAddCard, children }) => {
  const { theme } = useMode(); // 테마 가져오기
  const { setNodeRef, isOver } = useDroppable({
    id, // 이 컬럼을 드롭 가능한 영역으로 설정
  });

  return (
    <div
      ref={setNodeRef} // 드롭 가능하게 설정
      style={{
        width: "300px",
        marginRight: "20px",
        background: theme.token.colorPrimary,
        padding: "15px",
        borderRadius: "15px",
        color: theme.token.colorTextBase,
        position: "relative", // 버튼을 절대 위치로 배치하기 위한 설정
      }}
    >
      <h2 style={{ color: theme.token.colorTextBase }}>{title}</h2>
      <Button
        onClick={() => onAddCard(id)}
        style={{
          position: "absolute", // 절대 위치로 설정
          top: "10px", // 상단에서 10px 떨어짐
          right: "10px", // 우측에서 10px 떨어짐
          borderRadius: "50%", // 버튼을 동그랗게 만듦
          width: "40px", // 버튼 너비
          height: "40px", // 버튼 높이
          padding: "0", // 기본 패딩 제거
          display: "flex", // 가운데 정렬을 위해 플렉스 박스 사용
          justifyContent: "center", // 가로 중앙 정렬
          alignItems: "center", // 세로 중앙 정렬
        }}
      >
        + {/* "+" 아이콘 */}
      </Button>
      <div style={{ marginTop: "20px" }}>{children}</div>
    </div>
  );
};
