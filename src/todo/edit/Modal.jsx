import React from "react";
import { Modal, Form, Button, Space } from "antd";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import DueDateForm from "./DueDateForm";
import UsersForm from "./UsersForm";
import StageForm from "./StageForm";

const TaskEditModal = ({ visible, onCancel, task, onSave }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave(values);
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
        <TitleForm initialValues={task} />
        <DescriptionForm initialValues={task} />
        <DueDateForm initialValues={task} />
        <UsersForm initialValues={task} />
        <StageForm />
      </Form>
    </Modal>
  );
};

export default TaskEditModal;
