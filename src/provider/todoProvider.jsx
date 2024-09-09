import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserProvider"; // 유저 컨텍스트 가져오기

// Context 생성
export const ToDoContext = createContext();

// 더미 데이터 (초기 상태)
const dummyTodos = [
  { id: 1, title: "할 일 1", description: "설명 1", status: "PENDING" },
  { id: 2, title: "할 일 2", description: "설명 2", status: "IN_PROGRESS" },
  { id: 3, title: "할 일 3", description: "설명 3", status: "COMPLETED" },
];

// Provider 컴포넌트
export const ToDoProvider = ({ children }) => {
  const { selectedUser } = useContext(UserContext); // UserContext에서 selectedUser 가져오기
  const [todos, setTodos] = useState(dummyTodos); // 할 일 목록 관리

  // 할 일 목록 가져오기
  const fetchTodos = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/todos/user/${userId}`
      );
      if (response.status === 200) {
        setTodos(response.data); // 서버에서 할 일 목록 불러오기
      }
    } catch (error) {
      console.error("API 요청 실패: 더미 데이터를 사용합니다.", error);
      setTodos(dummyTodos); // 실패 시 더미 데이터 사용
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchTodos(selectedUser); // selectedUser가 변경될 때마다 할 일 목록 불러오기
    }
  }, [selectedUser]);

  // 할 일 추가
  const addTodo = async (title, description) => {
    try {
      const response = await axios.post("http://localhost:8080/api/todos", {
        userId: selectedUser,
        title,
        description,
      });
      if (response.status === 200) {
        fetchTodos(selectedUser); // 성공 시 할 일 목록 다시 불러오기
      }
    } catch (error) {
      console.error("할 일 추가 실패", error);
    }
  };

  // 할 일 수정
  //   const updateTodo = async (todoId, updatedStatus) => {
  //     try {
  //       const response = await axios.put(
  //         `http://localhost:8080/api/todos/${todoId}`,
  //         {
  //           userId: selectedUser,
  //           status: updatedStatus,
  //         }
  //       );
  //       if (response.status === 200) {
  //         fetchTodos(selectedUser); // 수정 후 할 일 목록 다시 불러오기
  //       }
  //     } catch (error) {
  //       console.error("할 일 수정 실패", error);
  //     }
  //   };
  const updateTodo = async (todoId, updatedTask) => {
    try {
      // updatedTask에 포함된 필드에 따라 동적으로 데이터를 보냄
      const response = await axios.put(
        `http://localhost:8080/api/todos/${todoId}`,
        {
          userId: selectedUser, // 유저 ID
          ...(updatedTask.title && { title: updatedTask.title }), // 타이틀이 있을 때만 추가
          ...(updatedTask.description && {
            description: updatedTask.description,
          }), // 설명이 있을 때만 추가
          ...(updatedTask.status && { status: updatedTask.status }), // 상태가 있을 때만 추가
        }
      );
      if (response.status === 200) {
        fetchTodos(selectedUser); // 수정 후 할 일 목록 다시 불러오기
      }
    } catch (error) {
      console.error("할 일 수정 실패", error);
    }
  };

  // 할 일 삭제
  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/todos/${todoId}`
      );
      if (response.status === 200) {
        fetchTodos(selectedUser); // 삭제 후 할 일 목록 다시 불러오기
      }
    } catch (error) {
      console.error("할 일 삭제 실패", error);
    }
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
