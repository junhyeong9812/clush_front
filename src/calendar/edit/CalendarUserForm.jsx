import React, { useContext } from "react";
import { Form, Select, Button, Space } from "antd";
import { UserContext } from "./UserProvider"; // UserContext 가져오기

const CalendarUserForm = ({ initialValues, cancelForm }) => {
  const { users } = useContext(UserContext); // UserContext에서 유저 데이터 가져오기

  return (
    <Form initialValues={initialValues}>
      <Form.Item label="Users" name="users">
        <Select mode="multiple" placeholder="Assign users">
          {users.map((user) => (
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
