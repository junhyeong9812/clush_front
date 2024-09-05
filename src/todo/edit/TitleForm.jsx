import React from "react";
import { Form, Input } from "antd";

const TitleForm = ({ initialValues, isLoading }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter the task title" }]}
      >
        <Input disabled={isLoading} />
      </Form.Item>
    </Form>
  );
};

export default TitleForm;
