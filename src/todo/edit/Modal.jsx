import React, { useEffect } from "react";
import { Modal, Form, Button, Space, Input, Select } from "antd";

const TaskEditModal = ({ visible, onCancel, task, onSave, onDelete }) => {
  const [form] = Form.useForm();

  // task가 변경될 때마다 폼에 값을 업데이트
  useEffect(() => {
    form.setFieldsValue(task);
  }, [task, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave(values); // 폼 데이터만 onSave로 전달
      form.resetFields(); // 저장 후 폼 초기화
    });
  }; 

  const handleDelete = () => {
    onDelete(task.id); // 삭제 요청 시 task의 id로 onDelete 호출
  };

  // 모달을 닫을 때 (X 버튼이나 Cancel 버튼을 눌렀을 때)
  const handleCancel = () => {
    form.resetFields(); // 폼 데이터를 초기화
    onCancel(); // 부모 컴포넌트에서 모달을 닫는 함수 호출
  };

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={handleCancel} // X 버튼을 눌렀을 때 handleCancel 실행
      footer={
        <Space>
          {task?.id && ( // task에 id가 있을 때만 Delete 버튼 표시
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button onClick={handleCancel}>Cancel</Button>
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
          rules={[{ required: true, message: "Please enter the task title" }]}
        >
          <Input />
        </Form.Item>

        {/* Status */}
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="PENDING">To Do</Select.Option>
            <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
            <Select.Option value="COMPLETED">Done</Select.Option>
          </Select>
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskEditModal;
