import { Button, message, Space, Table } from "antd";
import axios from "axios";
import React from "react";
import Contact from "./Contact";

const GetList = ({ contactList, getList }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/contact/${id}`);
      message.success("Contact Deleted");
      getList();
    } catch (error) {
      message.error("Contact Deleted");
    }
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Contact getList={getList} contact={record}>
            Update
          </Contact>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="table-container">
      <Table
        dataSource={contactList}
        columns={columns}
        rowKey={contactList._id}
      />
    </div>
  );
};

export default GetList;
