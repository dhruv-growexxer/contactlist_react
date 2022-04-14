import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

const AddList = ({ getList }) => {
  const onFinish = async (values) => {
    const { first_name, last_name, phone } = values;
    if (first_name !== "" && last_name !== "" && phone !== 0) {
      try {
        const postList = await axios.post("http://localhost:5000/api/contact", {
          first_name: first_name,
          last_name: last_name,
          phone,
        });

        message.success("Contact added");
      } catch (error) {
        message.error("Error while adding contact");
        console.log("error ", error);
      }
      // handleAdd(firstName, lastName, phone);
      getList();
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Error while adding contact");
    console.log(errorInfo);
  };
  return (
    <Form
      layout="horizontal"
      name="addlist"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First name"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="last_name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
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
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddList;
