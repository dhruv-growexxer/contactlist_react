import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Popconfirm, message, Input } from "antd";
import Contact from "./Contact";

const GetList = () => {
  const [contactList, setContactList] = useState([]);
 
  useEffect(() => {
    try {
      const fetchList = async () => {
        const { data } = await axios.get("http://localhost:5000/api/contacts");
        setContactList([...data]);
        console.log(data, "data");
      };
      fetchList();
    } catch (error) {
      console.log("error from GetList ", error);
    }
  }, []);


  return (
    <>
      {
        
        contactList.map((contact, index) => {
        return (
          <Contact contact={contact} key={index}/>
        );
      })}
    </>
  );
};

export default GetList;
  