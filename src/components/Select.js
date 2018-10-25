import React from "react";

const Select = ({ select, handleChange }) => {
  const intercept = ({ target: { id } }) => {
    const e = { target: { value: id, id: "select" } };
    handleChange(e);
  }; // ul/li does not have the form API hence this little trick

  return (
    <ul type="select" id="select" onClick={intercept} value="select">
      <li id="Title">Title</li>
      <li id="Author">Author</li>
      <li id="Date">Date</li>
    </ul>
  );
};

export default Select;
