import React from "react";
import Contact from "./Contact";

const GetList = ({ contactList, handleDelete }) => {
  return (
    <>
      {contactList.map((contact, index) => {
        return (
          <Contact contact={contact} key={index} handleDelete={handleDelete} />
        );
      })}
    </>
  );
};

export default GetList;
