import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Space, Input, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";
import { UserContext } from "../../provider/UserProvider";
import CalendarUserForm from "./CalendarUserForm";
import { EventContext } from "../../provider/EventProvider";

const CalendarModal = ({ visible, onCancel, task, onSave, onDelete }) => {
  const [form] = Form.useForm();
  const [isSharing, setIsSharing] = useState(false); // 공유 폼 표시 여부
  const { userId } = useContext(EventContext); // 현재 로그인한 사용자 ID 가져오기
  const { users } = useContext(UserContext);
  useEffect(() => {
    console.log("task", task);
    if (task) {
      form.setFieldsValue({
        title: task?.title || "",
        description: task?.description || "",
        startDate: task?.start ? dayjs(task.start) : null,
        endDate: task?.end ? dayjs(task.end) : null,
        allDay: task?.allDay || false,
        sharedByUser: task?.isShared ? task.sharedByUser : "Not Shared",
        sharedWithUser: task?.isShared ? task.sharedWithUser : "Not Shared",
      });
    }
  }, [task, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        title: values.title,
        description: values.description,
        startTime: values.startDate.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: values.endDate.format("YYYY-MM-DDTHH:mm:ss"),
        allDay: values.allDay || false,
      };
      if (task?.id) {
        formattedValues.id = task.id; // task가 이미 존재하면 id도 포함
      }
      onSave(formattedValues);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.setFieldsValue({
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      allDay: false,
      sharedByUser: "Not Shared",
      sharedWithUser: "Not Shared",
    });
    form.resetFields();
    if (isSharing) {
      setIsSharing(false); // 공유 폼을 닫음
    }
    onCancel();
  };

  const handleDelete = () => {
    console.log(task.id);
    onDelete(task.id);
  };
  //일정 공유
  const handleShare = async (selectedUsers) => {
    try {
      await Promise.all(
        selectedUsers.map(async (sharedUserId) => {
          const response = await fetch(
            "http://localhost:8080/api/calendar/share",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                eventId: task.id, // 현재 이벤트 ID
                sharedByUserId: userId, // 현재 로그인한 사용자 ID
                sharedUserId, // 선택한 사용자 ID
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to share event");
          }
        })
      );
      console.log("Event shared successfully");
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  };

  return (
    <Modal
      title="Edit Event"
      visible={visible}
      onCancel={handleCancel}
      footer={
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          {task && (
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button type="primary" onClick={handleOk}>
            Save
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        initialValues={{
          title: task?.title || "",
          description: task?.description || "",
          startDate: task?.start ? dayjs(task.start) : null,
          endDate: task?.end ? dayjs(task.end) : null,
          allDay: task?.allDay || false,
          sharedByUser: task?.isShared ? task.sharedByUser : "Not Shared",
          sharedWithUser: task?.isShared ? task.sharedWithUser : "Not Shared",
        }}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the event title" }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Start Date */}
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>

        {/* End Date */}
        <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>

        {/* All Day */}
        <Form.Item name="allDay" valuePropName="checked">
          <Checkbox>All Day</Checkbox>
        </Form.Item>
        <Form.Item label="Shared By" name="sharedByUser">
          <Input
            disabled
            value={task?.isShared ? task.sharedByUser : "Not Shared"}
          />
        </Form.Item>
        <Form.Item label="Shared With" name="sharedWithUser">
          <Input
            disabled
            value={task?.isShared ? task.sharedWithUser : "Not Shared"}
          />
        </Form.Item>
      </Form>
      {/* CalendarUserForm - 일정 공유 폼 */}
      {task?.id && (
        <div>
          <Button
            onClick={() => setIsSharing(!isSharing)}
            type="primary"
            style={{ marginBottom: "16px" }}
          >
            {isSharing ? "Close Sharing Form" : "Share Event"}
          </Button>
          {isSharing && (
            <CalendarUserForm
              cancelForm={() => setIsSharing(false)}
              onSubmit={handleShare}
              initialValues={{ users: [] }}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default CalendarModal;
