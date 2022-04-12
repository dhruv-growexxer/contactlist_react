import React, { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";

const AddList = ({ getList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);

  const handleSaveClick = async () => {
    if (firstName !== "" && lastName !== "" && phone !== 0) {
      try {
        const postList = await axios.post("http://localhost:5000/api/contact", {
          first_name: firstName,
          last_name: lastName,
          phone,
        });

        message.success("Contact added");
      } catch (error) {
        console.log("error ", error);
      }
      // handleAdd(firstName, lastName, phone);
      getList();
    }
  };

  return (
    <div className="add-list">
      <label htmlFor="first_name">Enter first name: </label>
      <Input
        style={{ width: 200, marginRight: 10 }}
        type="text"
        name="first_name"
        id=""
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="last_name">Enter last name: </label>
      <Input
        style={{ width: 200, marginRight: 10 }}
        type="text"
        name="last_name"
        id=""
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="phone">Enter phone number: </label>
      <Input
        style={{ width: 200, marginRight: 2, marginLeft: 2 }}
        type="number"
        name="phone"
        id=""
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        className="margin-medium"
        type="primary"
        onClick={handleSaveClick}
      >
        Add user
      </Button>{" "}
      <br />
      <br />
    </div>
  );
};

export default AddList;
