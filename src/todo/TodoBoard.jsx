import React, { useState, useContext } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { TodoBoardContainer } from "./TodoBoardContainer";
import { TodoColumn } from "./TodoColumn";
import { TodoItem } from "./TodoItem";
import { TodoCard } from "./TodoCard";
import { useMode } from "../theme"; // 테마 가져오기
import { ConfigProvider } from "antd";
import TaskEditModal from "./edit/Modal";
import { ToDoContext } from "../provider/todoProvider";

const TodoBoard = ({ isDashboard }) => {
  // isDashboard prop 받기
  const { theme } = useMode(); // 테마 가져오기
  const {
    todos = [], // 할 일 목록
    updateTodo, // 할 일 수정
    addTodo, // 할 일 추가
    deleteTodo, // 할 일 삭제
  } = useContext(ToDoContext); // 프로바이더에서 상태 관리 함수 사용

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [activeId, setActiveId] = useState(null); // 현재 드래그 중인 아이템 ID 저장
  const [isModalVisible, setIsModalVisible] = useState(false); // 수정 모달 가시성 관리
  const [activeTask, setActiveTask] = useState(null); // 수정할 태스크 저장

  // 드래그 시작 핸들러
  const handleOnDragStart = (event) => {
    setActiveId(event.active.id); // 드래그가 시작되면 아이템 ID 저장
  };

  // 드래그 종료 핸들러
  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus =
      over.id === "todo"
        ? "PENDING"
        : over.id === "inProgress"
        ? "IN_PROGRESS"
        : "COMPLETED";

    // 상태 업데이트는 ToDoProvider에서 처리
    updateTodo(active.id, { status: newStatus });

    setActiveId(null); // 드래그가 끝나면 activeId 초기화
  };

  // 카드 추가 버튼 클릭 시
  const handleAddCard = (status) => {
    setActiveTask({ title: "", description: "", status }); // 새로운 태스크에 컬럼의 status를 설정
    setIsModalVisible(true); // 모달 보이기
  };

  // 아이템을 클릭하면 수정 모달을 띄움
  const handleEditItem = (task) => {
    setActiveTask(task); // 수정할 태스크 설정
    setIsModalVisible(true); // 모달 보이기
  };

  const handleModalSave = (updatedTask) => {
    if (activeTask.id) {
      // 수정 모드
      updateTodo(activeTask.id, updatedTask); // 수정된 태스크 저장
    } else {
      // 추가 모드
      addTodo(updatedTask.title, updatedTask.description); // 새 태스크 추가
    }
    setIsModalVisible(false); // 모달 닫기
  };

  const handleDeleteTask = (taskId) => {
    deleteTodo(taskId); // 할 일 삭제
    setIsModalVisible(false); // 모달 닫기
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // 모달 닫기
  };

  const activeDraggedTask = todos.find((task) => task.id === activeId);

  // 대시보드에서 렌더링 시 "In Progress" 칼럼만 렌더링
  const columnsToRender = isDashboard
    ? ["IN_PROGRESS"] // 대시보드에서는 "In Progress" 칼럼만 렌더링
    : ["PENDING", "IN_PROGRESS", "COMPLETED"]; // 전체 보드에서는 모든 상태 렌더링

  return (
    <ConfigProvider theme={theme}>
      <TodoBoardContainer isDashboard={isDashboard}>
        <DndContext
          sensors={sensors}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
        >
          {columnsToRender.includes("PENDING") && (
            <TodoColumn
              id="todo"
              title="To Do"
              tasks={todos.filter((task) => task.status === "PENDING")}
              onAddCard={handleAddCard}
            >
              {todos
                .filter((task) => task.status === "PENDING")
                .map((task) => (
                  <TodoItem
                    key={task.id}
                    id={task.id}
                    onClick={() => handleEditItem(task)}
                  >
                    <TodoCard task={task} isDashboard={isDashboard} />
                  </TodoItem>
                ))}
            </TodoColumn>
          )}

          {columnsToRender.includes("IN_PROGRESS") && (
            <TodoColumn
              id="inProgress"
              title="In Progress"
              tasks={todos.filter((task) => task.status === "IN_PROGRESS")}
              onAddCard={handleAddCard}
            >
              {todos
                .filter((task) => task.status === "IN_PROGRESS")
                .map((task) => (
                  <TodoItem
                    key={task.id}
                    id={task.id}
                    onClick={() => handleEditItem(task)}
                  >
                    <TodoCard task={task} isDashboard={isDashboard} />
                  </TodoItem>
                ))}
            </TodoColumn>
          )}

          {columnsToRender.includes("COMPLETED") && (
            <TodoColumn
              id="done"
              title="Done"
              tasks={todos.filter((task) => task.status === "COMPLETED")}
              onAddCard={handleAddCard}
            >
              {todos
                .filter((task) => task.status === "COMPLETED")
                .map((task) => (
                  <TodoItem
                    key={task.id}
                    id={task.id}
                    onClick={() => handleEditItem(task)}
                  >
                    <TodoCard task={task} isDashboard={isDashboard} />
                  </TodoItem>
                ))}
            </TodoColumn>
          )}

          {/* DragOverlay: 드래그 중인 아이템을 표시 */}
          <DragOverlay>
            {activeDraggedTask ? <TodoCard task={activeDraggedTask} /> : null}
          </DragOverlay>
        </DndContext>

        {/* 수정 모달 */}
        <TaskEditModal
          visible={isModalVisible}
          task={activeTask}
          onCancel={handleModalCancel}
          onSave={handleModalSave}
          onDelete={handleDeleteTask} // 삭제 핸들러 추가
        />
      </TodoBoardContainer>
    </ConfigProvider>
  );
};

export default TodoBoard;
