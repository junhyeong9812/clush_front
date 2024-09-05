import React from "react";
import { Form, Select, Checkbox, Button, Space } from "antd";

const StageForm = ({ isLoading }) => {
  return (
    <Form>
      <Form.Item label="Stage" name="stage">
        <Select placeholder="Select a stage" disabled={isLoading}>
          <Select.Option value="todo">To Do</Select.Option>
          <Select.Option value="inProgress">In Progress</Select.Option>
          <Select.Option value="done">Done</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="completed" valuePropName="checked">
        <Checkbox disabled={isLoading}>Mark as complete</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default StageForm;
