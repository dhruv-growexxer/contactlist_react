import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      //   destroyOnClose={true}
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
          name="first_name"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input the first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
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

export const MyModal = ({ contact, getList }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = async (values) => {
    try {
      console.log("Received values of form: ", values);
      console.log(
        "from collectionsPage",
        contact._id,
        contact.first_name,
        contact.last_name,
        contact.phone
      );

      const res = await axios.put(
        `http://localhost:5000/api/contact/${contact._id}`,
        {
          _id: contact._id,
          first_name:
            contact.first_name === "" ? contact.first_name : values.first_name,
          last_name:
            contact.last_name === "" ? contact.last_name : values.last_name,
          phone: contact.phone === 0 ? contact.phone : values.phone,
        }
      );
      message.success("Contact Updated, Refresh the page");
      setVisible(false);
      getList();
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Update
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
