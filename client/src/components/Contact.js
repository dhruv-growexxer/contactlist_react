import React from "react";
import { MyModal } from "./MyModal";

const Contact = ({ contact, getList }) => {
  return <MyModal contact={contact} getList={getList} />;
};

export default Contact;
