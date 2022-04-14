import React from "react";
import { Modal, Form, Input, message } from "antd";

export const MyForm = ({ visible, onCreate, onCancel, contact }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Enter updates"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            message.error("Validation failed");
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          initialValue={contact.first_name}
          name="first_name"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input the first name!",
            },
          ]}
        >
          <Input defaultValue="hey" />
        </Form.Item>
        <Form.Item
          initialValue={contact.last_name}
          name="last_name"
          label="Last name"
          rules={[
            {
              required: true,
              message: "Please input the last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={contact.phone}
          name="phone"
          label="Phone number"
          rules={[
            {
              required: true,
              message: "Please input the Phone number!",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
