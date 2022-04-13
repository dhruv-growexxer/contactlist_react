import React from "react";
import { Button, Popconfirm } from "antd";
import { MyModal } from "./MyModal";

const Contact = ({ contact, handleDelete, getList }) => {
  return (
    <>
      <div>
        <label>First name: {contact.first_name}</label>
        <label>Last name: {contact.last_name}</label>
        <label>Phone: {contact.phone}</label> <br />
        <div className="align-items">
          <MyModal contact={contact} getList={getList} />
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
