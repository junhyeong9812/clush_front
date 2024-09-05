import React from "react";
import { Form, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";

const DueDateForm = ({ initialValues, cancelForm }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item
        label="Due Date"
        name="dueDate"
        getValueProps={(value) => {
          if (!value) return { value: undefined };
          return { value: dayjs(value) };
        }}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
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

export default DueDateForm;
