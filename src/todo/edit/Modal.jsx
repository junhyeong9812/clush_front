import React from "react";
import { Modal, Form, Button, Space, Input, DatePicker } from "antd";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import DueDateForm from "./DueDateForm";
import UsersForm from "./UsersForm";
import StageForm from "./StageForm";
import { Select } from "antd/lib";

const TaskEditModal = ({ visible, onCancel, task, onSave }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({ ...task, ...values }); // task에 폼에서 입력된 값 병합
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleOk}>
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} initialValues={task}>
        {/* Title Form */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>

        {/* Status */}
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="todo">To Do</Select.Option>
            <Select.Option value="inProgress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Due Date */}
        <Form.Item label="Due Date" name="dueDate">
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskEditModal;
