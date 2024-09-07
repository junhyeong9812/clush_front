import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const EventContext = createContext();

// 더미 데이터
const dummyEvents = [
  {
    id: "dummy-1",
    title: "Dummy Event 1",
    startTime: "2024-09-10T10:00",
    endTime: "2024-09-10T12:00",
    allDay: false,
    isShared: false, // 공유 여부 추가
  },
  {
    id: "dummy-2",
    title: "Dummy Event 2",
    startTime: "2024-09-11T08:00",
    endTime: "2024-09-11T09:00",
    allDay: false,
    isShared: true, // 공유된 이벤트
    sharedByUser: "User 1",
    sharedWithUser: "User 2",
  },
];

// 더미 공유 이벤트 데이터
const dummySharedEvents = [
  {
    id: "dummy-shared-1",
    title: "Shared Event 1",
    startTime: "2024-09-15T10:00",
    endTime: "2024-09-15T12:00",
    allDay: false,
    isShared: true,
    sharedByUser: "User 3",
    sharedWithUser: "User 1",
  },
];

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  // 쿠키에서 userId 가져오기 함수
  const getUserIdFromCookie = () => {
    const match = document.cookie.match(/userId=([^;]+)/);
    return match ? match[1] : null;
  };

  // 쿠키 설정 함수
  const setUserIdInCookie = (userId) => {
    document.cookie = `userId=${userId}; path=/; max-age=1800`;
    setUserId(userId);
  };

  // 서버에서 일정 로드
  const fetchEvents = async () => {
    const currentUserId = getUserIdFromCookie() || 1; // 없으면 userId=1
    try {
      const response = await fetch(
        `http://localhost:8080/api/calendar/user/${currentUserId}/events`
      );
      if (response.ok) {
        const events = await response.json();
        setEvents(events);
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error("API error, loading dummy data");
      const combinedDummyEvents = [...dummyEvents, ...dummySharedEvents]; // 공유 이벤트 포함
      setEvents(combinedDummyEvents); // 더미 데이터 로드
    }
  };

  // 이벤트 추가 함수
  const addEvent = async (newEvent) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/calendar/create?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.ok) {
        const savedEvent = await response.json();
        setEvents([...events, savedEvent]);
      } else {
        throw new Error("Failed to save event");
      }
    } catch (error) {
      console.error("API error, adding to dummy events");
      const dummyEvent = { ...newEvent, id: `dummy-${new Date().getTime()}` };
      setEvents([...events, dummyEvent]); // 더미 데이터에 저장
    }
  };

  useEffect(() => {
    fetchEvents(); // 컴포넌트 마운트 시 이벤트 로드
  }, []);

  return (
    <EventContext.Provider
      value={{ events, addEvent, userId, setUserIdInCookie }}
    >
      {children}
    </EventContext.Provider>
  );
};
