import "./App.css";
import AddList from "./components/AddList";
import GetList from "./components/GetList";
import Headers from "./components/Headers";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { message } from "antd";

function App() {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    try {
      console.log("in getList");
      const fetchList = async () => {
        const { data } = await axios.get("http://localhost:5000/api/contacts");
        setContactList([...data]);
        console.log(data, "contactList from getList");
      };
      fetchList();
    } catch (error) {
      console.log("error from GetList ", error);
    }
  };

  const addToList = async (firstName, lastName, phone) => {
    try {
      const postList = await axios.post("http://localhost:5000/api/contact", {
        first_name: firstName,
        last_name: lastName,
        phone,
      });

      const tempObj = {
        first_name: firstName,
        last_name: lastName,
        phone,
      };

      const tempContactList = [...contactList, tempObj];
      setContactList(tempContactList);
      console.log(contactList, "contactList from addToList");
      message.success("Contact added");
    } catch (error) {
      console.log("error ", error);
    }
  };

  // const updateContact = async (id, fname, lname, pno) => {
  //   console.log(id, fname, lname, pno);
  //   const res = await axios.put(`http://localhost:5000/api/contact/${id}`, {
  //     id: id,
  //     first_name: newFirstName === "" ? fname : newFirstName,
  //     last_name: newLastName === "" ? lname : newLastName,
  //     phone: newPhone === 0 ? pno : newPhone,
  //   });
  // };

  const deleteContact = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/contact/${id}`);

    // console.log("ContactList after deleting", id);
    // contactList.map((contact, index) => {
    //   console.log("--------------", contact._id);
    // });
    // console.log("res from deleteContact", res);
    const newContactList = contactList.filter((contact) => contact._id !== id);
    // console.log("NewContactList from deleteContact", newContactList);
    setContactList(newContactList);
    message.success("Contact Deleted, Refresh the page");
  };

  return (
    <div className="App">
      <Headers />
      <AddList handleAdd={addToList} />
      <GetList
        contactList={contactList}
        onChange={getList}
        handleDelete={deleteContact}
        // handleUpdate={updateContact}
      />
    </div>
  );
}

export default App;
