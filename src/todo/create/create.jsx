import { useSearchParams } from "react-router-dom";
import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { Form, Input, Modal } from "antd";

export const TasksCreatePage = () => {
  const [searchParams] = useSearchParams();
  const { list } = useNavigation();
  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    defaultVisible: true,
    // GraphQL 및 TypeScript 제거
    meta: {
      // gqlMutation: CREATE_TASK_MUTATION, // 제거된 GraphQL 관련 코드
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("tasks", "replace");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId"))
              : null,
            userIds: [], // 기본값 유지
          });
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
