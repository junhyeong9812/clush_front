import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const UserContext = createContext();

// 더미 유저 데이터
const dummyUsers = [
  { id: 1, username: "User 1" },
  { id: 2, username: "User 2" },
  { id: 3, username: "User 3" },
  { id: 4, username: "User 4" },
];

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // 유저 데이터 가져오기 (API or Dummy)
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("API error, using dummy users", error);
      setUsers(dummyUsers); // API 실패 시 더미 데이터 사용
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};
