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
        setContactList(data);
        console.log(data, "contactList from getList");
      };
      fetchList();
    } catch (error) {
      message.error("Can't get contact list");
      console.log("error from GetList ", error);
    }
  };

  return (
    <div className="App">
      <Headers />
      <AddList getList={getList} />
      <GetList contactList={contactList} onChange={getList} getList={getList} />
    </div>
  );
}

export default App;
