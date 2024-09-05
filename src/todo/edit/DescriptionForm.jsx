import React from "react";
import { Form, Input } from "antd";

const DescriptionForm = ({ initialValues, cancelForm }) => {
  return (
    <Form initialValues={initialValues}>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "12px",
        }}
      >
        <button type="button" onClick={cancelForm}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default DescriptionForm;
