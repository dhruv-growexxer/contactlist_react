import axios from "axios";
import React, { useState } from "react";
import { Button, message } from "antd";
import { MyForm } from "./MyForm";

export const MyModal = ({ contact, getList }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = async (values) => {
    try {
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
      message.success("Contact Updated");
      setVisible(false);
      getList();
    } catch (error) {
      message.error("Error while updating contact");
      console.log(error);
    }
    getList();
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Update
      </Button>
      <MyForm
        contact={contact}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
