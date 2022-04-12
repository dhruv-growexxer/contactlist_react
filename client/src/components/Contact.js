import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Popconfirm } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
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
        layout="vertical"
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
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({ contact, getList }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = async (values) => {
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
  };

  return (
    <div>
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

const Contact = ({ contact, handleDelete, getList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id, fname, lname, pno) => {
    console.log(id, fname, lname, pno);
    // if ('' !== newFirstName) {
    //     console.log("newfirstname", newFirstName)
    // }
    // '' -> prevValue ie fname
    // not'' -> newValue ie newFirstName

    axios
      .put(`http://localhost:5000/api/contact/${id}`, {
        id: id,
        first_name: newFirstName === "" ? fname : newFirstName,
        last_name: newLastName === "" ? lname : newLastName,
        phone: newPhone === 0 ? pno : newPhone,
      })
      .then(() => {
        message.success("Contact Updated, Refresh the page");
        setIsModalVisible(false);
      });
    // setIsModalVisible(false)
  };

  const handleCancel = () => {
    setNewFirstName("");
    setNewLastName("");
    setNewPhone(0);
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        <label>First name: {contact.first_name}</label>
        <label>Last name: {contact.last_name}</label>
        <label>Phone: {contact.phone}</label> <br />
        <div className="align-items">
          <CollectionsPage contact={contact} getList={getList} />
          {/* <Button type="primary" onClick={showModal}>
            Update
          </Button>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={() =>
              handleOk(
                contact._id,
                contact.first_name,
                contact.last_name,
                contact.phone
              )
            }
            onCancel={handleCancel}
          >
            <Form>
              <Input
                value={newFirstName}
                type="text"
                name="new_first_name"
                placeholder="Edit first name"
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <Input
                type="text"
                name="new_last_name"
                placeholder="Edit last name"
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <Input
                type="number"
                name="new_phone"
                placeholder="Edit phone number"
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form>
          </Modal> */}
          {/* <Button type="primary" danger ghost onClick={() => deleteContact(contact._id)}>Delete</Button> */}

          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(contact._id)}
          >
            <Button className="margin-medium" type="primary" danger ghost>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default Contact;
