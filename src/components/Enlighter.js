import React from "react";

/*
    This behave exactly like the Parser Component 
    except it searches for the input value
*/
const Enlighter = ({ select, search, children }) => {
  const replacer = (general, group) => {
    return `<mark class="${select}-marker">&nbsp;${group}&nbsp;</mark>`;
  };
  const reg = new RegExp(`(${search})`, "gi");
  const lines = children.replace(reg, replacer);

  return <div dangerouslySetInnerHTML={{ __html: lines }} />;
};

export default Enlighter;
