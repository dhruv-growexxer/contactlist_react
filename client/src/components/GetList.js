import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";

const GetList = () => {
  const [contactList, setContactList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState(0);

  useEffect(() => {
    try {
      const fetchList = async () => {
        const { data } = await axios.get("http://localhost:5000/api/contacts");
        setContactList([...data]);
        console.log(data);
        console.log(contactList);
      };
      fetchList();
    } catch (error) {
      console.log("error from GetList ", error);
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id, fname, lname, pno) => {
    console.log(fname, lname, pno);
    // if ('' !== newFirstName) {
    //     console.log("newfirstname", newFirstName)
    // }
    // '' -> prevValue ie fname
    // not'' -> newValue ie newFirstName
    // axios.put(`http://localhost:5000/api/contact/${id}`, {
    //         id: id,
    //         first_name: newFirstName === '' ? fname : newFirstName,
    //         last_name: newLastName === '' ? lname : newLastName,
    //         phone: newPhone === 0 ? pno : newPhone,
    //     }
    // )
    console.log("modal ok closed");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setNewFirstName("");
    setNewLastName("");
    setNewPhone(0);
    setIsModalVisible(false);
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contact/${id}`);
  };

  return (
    <>
      {contactList.map((contact, index) => {
        return (
          <div key={index}>
            <label>First name: {contact.first_name}</label>{" "}
            <label>Last name: {contact.last_name}</label>{" "}
            <label>Phone: {contact.phone}</label>{" "}
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
              <input
                type="text"
                name="first_name"
                placeholder="Edit first name"
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Edit last name"
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <input
                type="number"
                name="phone"
                placeholder="Edit phone number"
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Modal>
                

            <Button type="primary" onClick={showModal}>
              Open Modal
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
              <p>{contact.first_name}</p>
              <p>{contact.last_name}</p>
              <p>{contact.phone}</p>
            </Modal>
                

            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default GetList;
