import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Layout, List, Typography, ConfigProvider } from "antd";
import { useMode } from "../theme";

const { Content, Sider } = Layout;

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const { theme } = useMode(); // 테마 가져오기

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
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
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <ConfigProvider theme={theme}>
      {/* Ant Design 테마 적용 */}
      <Layout style={{ padding: "20px" }}>
        <Sider
          // background={theme.token.colorBgBase}
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
            dataSource={currentEvents}
            renderItem={(event) => (
              <List.Item key={event.id}>
                <List.Item.Meta title={event.title} />
              </List.Item>
            )}
          />
        </Sider>

        <Layout style={{ paddingLeft: "15px" }}>
          <Content style={{ background: theme.token.colorBgBase }}>
            <FullCalendar
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
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                { id: "12315", title: "All-day event", date: "2022-09-14" },
                { id: "5123", title: "Timed event", date: "2022-09-28" },
              ]}
            />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Calendar;
