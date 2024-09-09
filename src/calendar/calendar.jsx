import React, { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Layout, List, Typography, ConfigProvider } from "antd";
import { useMode } from "../theme";
import { EventContext } from "../provider/EventProvider"; // 이벤트 컨텍스트 임포트
import CalendarModal from "./edit/CalendarModal";
import dayjs from "dayjs";
import { UserContext } from "../provider/UserProvider";

const { Content, Sider } = Layout;

const Calendar = ({ isDashboard }) => {
  const { events, addOrUpdateEvent, deleteEvent, setUserId, fetchEvents } =
    useContext(EventContext); // 이벤트 추가/삭제 함수 사용
  const { selectedUser } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 창 상태
  const [currentTask, setCurrentTask] = useState(null); // 현재 수정할 이벤트
  const { theme } = useMode(); // 테마 가져오기
  const [formattedEvents, setFormattedEvents] = useState([]); // 변환된 이벤트 상태
  // 이벤트 데이터를 FullCalendar에 맞게 변환하는 useEffect
  useEffect(() => {
    if (selectedUser) {
      setUserId(selectedUser); // 유저 선택 시 userId 업데이트
    }
  }, [selectedUser, setUserId]);
  useEffect(() => {
    const transformEvents = events.map((event) => ({
      id: event.eventId,
      title: event.title,
      start: event.startTime || event.start,
      end: event.endTime || event.end,
      backgroundColor: event.shared ? "#ff0000" : "#3788d8", // 공유된 일정은 빨간색, 그렇지 않으면 기본 색상
      borderColor: event.shared ? "#ff0000" : "#3788d8",
      allDay: event.allDay,
      extendedProps: {
        description: event.description,
        isShared: event.shared,
        sharedByUser: event.sharedByUser,
        sharedWithUser: event.sharedWithUser,
      },
    }));
    console.log("Updated events:", events);
    setFormattedEvents(transformEvents);
  }, [events]);

  const handleDateClick = (selected) => {
    const correctedEnd = dayjs(selected.endStr)
      .subtract(1, "day")
      .format("YYYY-MM-DDTHH:mm:ss");
    setCurrentTask({
      title: "",
      description: "",
      start: selected.startStr,
      end: correctedEnd,
      allDay: selected.allDay,
    });
    setIsModalVisible(true); // 모달 창 열기
  };

  const handleEventClick = (selected) => {
    const event = selected.event; // FullCalendar 이벤트 객체
    console.log("Selected event:", event);

    // 기존 이벤트 수정 모드로 설정 (extendedProps로 description을 포함)
    setCurrentTask({
      id: event.id,
      title: event.title,
      description: event.extendedProps.description, // extendedProps에서 description 가져오기
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      isShared: event.extendedProps.isShared,
      sharedByUser: event.extendedProps.sharedByUser,
      sharedWithUser: event.extendedProps.sharedWithUser,
    });
    setIsModalVisible(true); // 모달 창 열기
  };

  const handleSave = async (task) => {
    console.log("task저장:", task);
    await addOrUpdateEvent(task); // 이벤트 추가 후
    await fetchEvents(); // 최신 데이터를 가져와 재렌더링
    setIsModalVisible(false); // 모달 창 닫기
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId); // 이벤트 삭제
    setIsModalVisible(false); // 모달 창 닫기
  };

  const handleCancel = () => {
    setIsModalVisible(false); // 모달 창 닫기
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ padding: "20px" }}>
        {isDashboard ? (
          // 대시보드일 때 FullCalendar만 렌더링
          <Content style={{ width: isDashboard ? "70%" : "100%" }}>
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView="dayGridMonth"
              events={formattedEvents}
            />
            {/* 모달 창 */}
            {/* <CalendarModal
              visible={isModalVisible}
              task={currentTask}
              onCancel={handleCancel}
              onSave={handleSave}
              onDelete={handleDelete}
            /> */}
          </Content>
        ) : (
          // 대시보드가 아닐 때 전체 캘린더와 사이드바 렌더링
          <>
            <Sider
              width={200}
              style={{
                background: theme.token.colorBgBase,
                padding: "15px",
                borderRadius: "4px",
                color: theme.token.colorTextBase,
              }}
            >
              <Typography.Title
                level={5}
                style={{ color: theme.token.colorTextBase }}
              >
                일정
              </Typography.Title>
              <List
                dataSource={events}
                renderItem={(event) => (
                  <List.Item key={event.id}>
                    <List.Item.Meta title={event.title} />
                  </List.Item>
                )}
              />
            </Sider>

            <Layout
              style={{
                paddingLeft: "15px",
                minWidth: "800px",
                maxWidth: "800px",
              }}
            >
              <Content style={{ background: theme.token.colorBgBase }}>
                <FullCalendar
                  key={formattedEvents.length} // key로 강제 렌더링 유도
                  height="75vh"
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                  ]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  events={formattedEvents}
                  select={handleDateClick}
                  eventClick={handleEventClick}
                />
              </Content>
            </Layout>
          </>
        )}
        {/* <Sider
          width={200}
          style={{
            background: theme.token.colorBgBase,
            padding: "15px",
            borderRadius: "4px",
            color: theme.token.colorTextBase,
          }}
        >
          <Typography.Title
            level={5}
            style={{ color: theme.token.colorTextBase }}
          >
            일정
          </Typography.Title>
          <List
            dataSource={events}
            renderItem={(event) => (
              <List.Item key={event.id}>
                <List.Item.Meta title={event.title} />
              </List.Item>
            )}
          />
        </Sider>

        <Layout
          style={{
            paddingLeft: "15px",
            minWidth: "800px",
            maxWidth: "800px",
          }}
        >
          <Content style={{ background: theme.token.colorBgBase }}>
            <FullCalendar
              key={formattedEvents.length} // key로 강제 렌더링 유도
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              events={formattedEvents} // 컨텍스트에서 불러온 이벤트
              select={handleDateClick}
              eventClick={handleEventClick}
            /> */}

        {/* 모달 창 */}
        {/* <CalendarModal
              visible={isModalVisible}
              task={currentTask}
              onCancel={handleCancel}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </Content>
        </Layout> */}
        {/* 모달 창 */}
        <CalendarModal
          visible={isModalVisible}
          task={currentTask}
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default Calendar;
