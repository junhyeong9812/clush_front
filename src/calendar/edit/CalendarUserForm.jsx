import React, { useContext } from "react";
import { Form, Select, Button, Space } from "antd";
import { UserContext } from "../../provider/UserProvider";
import { EventContext } from "../../provider/EventProvider";

const CalendarUserForm = ({ cancelForm, onSubmit, initialValues }) => {
  const { users } = useContext(UserContext);
  const { userId } = useContext(EventContext); // 현재 사용자 ID 가져오기
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const selectedUsers = values.users; // 선택한 유저 목록
    onSubmit(selectedUsers); // 상위 컴포넌트로 전달
  };
  const handleCancel = () => {
    form.resetFields(); // 폼 필드를 리셋하여 선택된 값 초기화
    cancelForm(); // 상위 컴포넌트의 cancelForm 호출
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleFinish}>
      <Form.Item label="Users" name="users">
        <Select mode="multiple" placeholder="Assign users">
          {users
            .filter((user) => user.id !== userId) // 본인의 ID 제외
            .map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.username}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Space>
        <Button type="default" onClick={cancelForm}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default CalendarUserForm;
