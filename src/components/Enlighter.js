import React from "react";

/*
    This behave exactly like the Parser Component 
    except it searches for the input value
*/

/*Enlighter and Parse use the same function, could be abstracted */

export const Enlighter = ({ select, search, children }) => {
  const replacer = (general, group) => `*${group}*`;

  const reg = new RegExp(`(${search})`, "gi");

  const lines = children.replace(reg, replacer);
  const enhanced = lines.split("*");
  return enhanced.map(
    (e, i) =>
      i === 1 ? (
        <mark className={`${select}-marker`}>
          &nbsp;
          {e}
          &nbsp;
        </mark>
      ) : (
        e
      )
  );
};

export default Enlighter;
