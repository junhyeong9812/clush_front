import React from "react";
import { Form, Select, Button, Space } from "antd";

const UsersForm = ({ initialValues, cancelForm }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item label="Users" name="users">
        <Select mode="multiple" placeholder="Assign users">
          <Select.Option value="1">User 1</Select.Option>
          <Select.Option value="2">User 2</Select.Option>
          <Select.Option value="3">User 3</Select.Option>
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

export default UsersForm;
