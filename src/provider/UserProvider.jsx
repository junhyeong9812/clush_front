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
  const [selectedUser, setSelectedUser] = useState(null);

  // 유저 데이터 가져오기 (API or Dummy)
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setSelectedUser(data[0]?.id || null); // 기본 유저 선택
        setUserIdInCookie(data[0]?.id || null); // 쿠키에 기본 유저 저장
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("API error, using dummy users", error);
      setUsers(dummyUsers);
      setSelectedUser(dummyUsers[0]?.id || null);
      setUserIdInCookie(dummyUsers[0]?.id || null);
    }
  };

  // 쿠키 설정 함수
  const setUserIdInCookie = (userId) => {
    document.cookie = `userId=${userId}; path=/; max-age=1800`;
  };

  // 유저 선택 시 쿠키에 저장
  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setUserIdInCookie(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, selectedUser, handleUserSelect, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};
