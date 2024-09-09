import React, { useContext, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { UserContext } from "../provider/UserProvider";

const UserCreationModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design의 form 인스턴스 생성
  const { fetchUsers } = useContext(UserContext); // 유저 목록을 업데이트하는 함수

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("User created successfully!");
        onClose(); // 모달 닫기
        fetchUsers(); // 유저 목록 업데이트
      } else {
        message.error(data.message || "User creation failed!");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while creating the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields(); // 모달이 닫힐 때 폼 초기화
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      visible={visible}
      title="사용자 생성"
      onCancel={handleCancel} // 모달 닫힘 시 handleCancel 호출
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          label="사용자명"
          name="username"
          rules={[{ required: true, message: "사용자명을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요." },
            { type: "email", message: "이메일형식이 아닙니다." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "등록하실 비밀번호를 입력해주세요." },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreationModal;
