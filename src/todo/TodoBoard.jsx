import React, { useState } from "react";
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

const TodoBoard = () => {
  const { theme } = useMode(); // 테마 가져오기
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Task 1",
      description: "This is task 1",
      status: "todo",
      dueDate: "2024-09-01",
    },
    {
      id: "2",
      title: "Task 2",
      description: "This is task 2",
      status: "inProgress",
      dueDate: "2024-09-02",
    },
    {
      id: "3",
      title: "Task 3",
      description: "This is task 3",
      status: "done",
      dueDate: "2024-09-03",
    },
  ]);

  const [activeId, setActiveId] = useState(null); // 현재 드래그 중인 아이템 ID 저장
  const [isModalVisible, setIsModalVisible] = useState(false); // 수정 모달 가시성 관리
  const [activeTask, setActiveTask] = useState(null); // 수정할 태스크 저장

  const handleOnDragStart = (event) => {
    setActiveId(event.active.id); // 드래그가 시작되면 아이템 ID 저장
  };

  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const newTasks = tasks.map(
      (task) => (task.id === active.id ? { ...task, status: over.id } : task) // 상태 업데이트
    );
    setTasks(newTasks);
    setActiveId(null); // 드래그가 끝나면 activeId 초기화
  };

  // 카드 추가 버튼 클릭 시 모달을 띄움
  const handleAddCard = (status) => {
    const newTask = {
      id: `${tasks.length + 1}`,
      title: `New Task`,
      description: `New task description`,
      status,
      dueDate: "2024-09-10",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // 아이템을 클릭하면 수정 모달을 띄움
  const handleEditItem = (task) => {
    setActiveTask(task); // 수정할 태스크 설정
    setIsModalVisible(true); // 모달 보이기
  };

  const handleModalSave = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === activeTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks); // 태스크 업데이트
    setIsModalVisible(false); // 모달 닫기
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // 모달 닫기
  };

  // 현재 드래그 중인 태스크를 찾기
  const activeDraggedTask = tasks.find((task) => task.id === activeId);

  return (
    <ConfigProvider theme={theme}>
      <TodoBoardContainer>
        <DndContext
          sensors={sensors}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
        >
          {/* To Do Column */}
          <TodoColumn
            id="todo"
            title="To Do"
            tasks={tasks}
            onAddCard={handleAddCard}
          >
            {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  onClick={() => handleEditItem(task)}
                >
                  <TodoCard task={task} />
                </TodoItem>
              ))}
          </TodoColumn>

          {/* In Progress Column */}
          <TodoColumn
            id="inProgress"
            title="In Progress"
            tasks={tasks}
            onAddCard={handleAddCard}
          >
            {tasks
              .filter((task) => task.status === "inProgress")
              .map((task) => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  onClick={() => handleEditItem(task)}
                >
                  <TodoCard task={task} />
                </TodoItem>
              ))}
          </TodoColumn>

          {/* Done Column */}
          <TodoColumn
            id="done"
            title="Done"
            tasks={tasks}
            onAddCard={handleAddCard}
          >
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  onClick={() => handleEditItem(task)}
                >
                  <TodoCard task={task} />
                </TodoItem>
              ))}
          </TodoColumn>

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
        />
      </TodoBoardContainer>
    </ConfigProvider>
  );
};

export default TodoBoard;
