import React from "react";
import Contact from "./Contact";

const GetList = ({ contactList, handleDelete, getList }) => {
  return (
    <>
      {contactList.map((contact, index) => {
        return (
          <Contact
            contact={contact}
            key={index}
            handleDelete={handleDelete}
            getList={getList}
          />
        );
      })}
    </>
  );
};

export default GetList;
