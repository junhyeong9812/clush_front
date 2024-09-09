import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const EventContext = createContext();

// 더미 데이터
const dummyEvents = [
  {
    id: 1,
    title: "Dummy Event 1",
    description: "Dummy Event 1",
    startTime: "2024-09-10T10:00",
    endTime: "2024-09-10T12:00",
    allDay: false,
    isShared: false, // 공유 여부 추가
  },
  {
    id: 2,
    title: "Dummy Event 2",
    description: "Dummy Event 2",
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
    id: 1,
    title: "Shared Event 1",
    description: "Shared Dummy Event 1",
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
        console.log("Fetched events:", events); // 데이터 확인
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

  // 이벤트 추가 또는 수정 함수
  const addOrUpdateEvent = async (event) => {
    // 새로운 이벤트인지 기존 이벤트인지 판단 (id 유무로 판단)
    if (event.id) {
      // 이벤트 수정 로직
      try {
        const response = await fetch(
          `http://localhost:8080/api/calendar/${event.id}/update`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
          }
        );

        if (response.ok) {
          const updatedEvent = await response.json();
          await fetchEvents();
        } else {
          throw new Error("Failed to update event");
        }
      } catch (error) {
        console.error("API error, updating dummy events");
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? event : e))
        );
      }
    } else {
      // 새로운 이벤트 추가 로직
      try {
        const response = await fetch(
          `http://localhost:8080/api/calendar/create?userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
          }
        );

        if (response.ok) {
          const savedEvent = await response.json();
          await fetchEvents();
        } else {
          throw new Error("Failed to save event");
        }
      } catch (error) {
        console.error("API error, adding to dummy events");
        const newDummyEvent = { ...event, id: events.length + 1 }; // id 자동 생성 (숫자형)
        setEvents([...events, newDummyEvent]); // 더미 데이터에 저장
      }
    }
  };
  // 이벤트 삭제 함수
  const deleteEvent = async (eventId, sharedByUser) => {
    const currentUserId = getUserIdFromCookie() || userId; // 쿠키에서 userId 가져오기
    const transferOwnership = sharedByUser === null; // sharedByUser가 null이면 소유권 이전
    try {
      const response = await fetch(
        `http://localhost:8080/api/calendar/delete?userId=${currentUserId}`, // userId를 파라미터로 추가
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, transferOwnership }),
        }
      );
      if (response.ok) {
        await fetchEvents();
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Delete failed, removing from local state.", error);
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  // 이벤트 공유 함수
  const shareEvent = async (eventId, sharedUserId) => {
    try {
      const response = await fetch("http://localhost:8080/api/calendar/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          sharedByUserId: userId,
          sharedUserId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to share event");
      }
    } catch (error) {
      console.error("Failed to share event. Storing dummy share info.");
    }
  };

  // userId가 변경될 때마다 일정을 불러옴
  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  return (
    <EventContext.Provider
      value={{
        events,
        fetchEvents,
        addOrUpdateEvent,
        deleteEvent,
        shareEvent,
        userId,
        setUserIdInCookie,
        setUserId,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
