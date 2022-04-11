import React from "react";
import Contact from "./Contact";

const GetList = ({ contactList }) => {
  return (
    <>
      {contactList.map((contact, index) => {
        return <Contact contact={contact} key={index} />;
      })}
    </>
  );
};

export default GetList;
