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
    handleChange();
  }, []);

  const handleChange = () => {
    try {
      console.log("in handleChange");
      const fetchList = async () => {
        const { data } = await axios.get("http://localhost:5000/api/contacts");
        setContactList([...data]);
        console.log(data, "data");
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
      console.log(postList, "postList");
      message.success("Contact added, Refresh the page");
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="App">
      <Headers />
      <AddList handleAdd={addToList} />
      <GetList contactList={contactList} onChange={handleChange} />
    </div>
  );
}

export default App;
