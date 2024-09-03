import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { Layout, List, Typography, Button } from "antd";
// antd에서 Layout, List, Typography 컴포넌트와 Button을 가져옵니다.
import {
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
// antd에서 사용할 아이콘들을 가져옵니다.

const { Header, Content, Sider } = Layout;
// Layout 컴포넌트에서 Header, Content, Sider를 사용합니다.

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  // 현재 일정(events)을 관리하기 위한 상태를 선언합니다.

  const handleDateClick = (selected) => {
    // 날짜를 클릭했을 때 호출되는 함수입니다.
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      // 사용자가 이벤트 제목을 입력한 경우, 새로운 이벤트를 추가합니다.
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    // 이벤트를 클릭했을 때 호출되는 함수입니다.
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove(); // 사용자가 확인한 경우, 이벤트를 삭제합니다.
    }
  };

  return (
    <Layout style={{ padding: "20px" }}>
      {/* 전체 Layout 컴포넌트를 사용하여 기본 레이아웃을 설정합니다. */}

      <Sider
        width={200}
        style={{ background: "#fff", padding: "15px", borderRadius: "4px" }}
      >
        {/* 사이드바를 Sider로 설정합니다. 너비와 배경색, 패딩을 설정합니다. */}
        <Typography.Title level={5}>일정</Typography.Title>
        {/* antd의 Typography.Title을 사용하여 제목을 표시합니다. */}
        <List
          dataSource={currentEvents}
          renderItem={(event) => (
            <List.Item
              key={event.id}
              style={{ margin: "10px 0", borderRadius: "2px" }}
            >
              {/* 각 이벤트 항목을 List.Item으로 표시합니다. */}
              <List.Item.Meta
                title={event.title}
                description={formatDate(event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                // 이벤트의 시작 날짜를 '년 월 일' 형식으로 표시합니다.
              />
            </List.Item>
          )}
        />
      </Sider>
      {/* 일정 목록 사이드바: 일정 이벤트 목록을 표시합니다. */}

      <Layout style={{ paddingLeft: "15px" }}>
        <Content>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            // FullCalendar에서 사용할 플러그인들을 설정합니다.
            headerToolbar={{
              left: "prev,next",
              // 기본적으로 이전과 다음 버튼을 설정합니다.
              center: "title",
              // 중앙에 캘린더의 제목(현재 날짜)를 표시합니다.
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              // 오른쪽에 월, 주, 일 보기 및 리스트 보기 버튼을 설정합니다.
            }}
            customButtons={{
              prev: {
                text: <LeftOutlined />,
                click: () => {
                  // 커스텀 이전 버튼 클릭 시, FullCalendar의 이전 기능을 호출합니다.
                  let calendarApi = document.querySelector(".fc-prev-button");
                  calendarApi.click();
                },
              },
              next: {
                text: <RightOutlined />,
                click: () => {
                  // 커스텀 다음 버튼 클릭 시, FullCalendar의 다음 기능을 호출합니다.
                  let calendarApi = document.querySelector(".fc-next-button");
                  calendarApi.click();
                },
              },
              today: {
                text: <CalendarOutlined />,
                click: () => {
                  // 오늘 날짜로 이동하는 커스텀 버튼을 클릭했을 때의 동작을 정의합니다.
                  let calendarApi = document.querySelector(".fc-today-button");
                  calendarApi.click();
                },
              },
            }}
            initialView="dayGridMonth"
            // 초기 뷰를 월간 달력으로 설정합니다.
            editable={true}
            // 일정 편집 기능을 활성화합니다.
            selectable={true}
            // 날짜 선택 기능을 활성화합니다.
            selectMirror={true}
            // 선택한 날짜의 미러 효과를 활성화합니다.
            dayMaxEvents={true}
            // 하루에 표시할 수 있는 최대 이벤트 수를 설정합니다.
            select={handleDateClick}
            // 날짜를 선택했을 때 호출되는 함수를 지정합니다.
            eventClick={handleEventClick}
            // 이벤트를 클릭했을 때 호출되는 함수를 지정합니다.
            eventsSet={(events) => setCurrentEvents(events)}
            // 캘린더의 이벤트가 변경될 때 상태를 업데이트합니다.
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
            // 초기 이벤트 데이터를 설정합니다.
          />
        </Content>
      </Layout>
      {/* FullCalendar 컴포넌트를 사용하여 인터랙티브한 캘린더를 표시합니다. */}
    </Layout>
  );
};

export default Calendar;
// Calendar 컴포넌트를 내보내어 다른 파일에서 사용할 수 있게 합니다.
