import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Popconfirm, message, Input, Form } from "antd";

const Contact = ({ contact }) => {
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

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contact/${id}`);
    message.success("Contact Deleted, Refresh the page");
  };
  return (
    <>
      <div className="container">
        <label>First name: {contact.first_name}</label>
        <label>Last name: {contact.last_name}</label>
        <label>Phone: {contact.phone}</label> <br />
        <div className="align-items">
          <Button type="primary" onClick={showModal}>
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
          </Modal>
          {/* <Button type="primary" danger ghost onClick={() => deleteContact(contact._id)}>Delete</Button> */}

          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteContact(contact._id)}
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
