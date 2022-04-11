import React, { useState } from "react";
import axios from "axios";
import { Button, Input, message } from "antd";

const AddList = () => {
  //useeffect here.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);

  const addToList = async () => {
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
    <div className="add-list">
      <label htmlFor="first_name">Enter first name: </label>
      <Input
        style={{ width: 200, marginRight:10 }}
        type="text"
        name="first_name"
        id=""
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="last_name">Enter last name: </label>
      <Input
        style={{ width: 200, marginRight:10 }}
        type="text"
        name="last_name"
        id=""
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="phone">Enter phone number: </label>
      <Input
        style={{ width: 200, marginRight:2, marginLeft:2 }}
        type="number"
        name="phone"
        id=""
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button className="margin-medium" type="primary" onClick={addToList}>
        Add user
      </Button>{" "}
      <br />
      <br />
    </div>
  );
};

export default AddList;
