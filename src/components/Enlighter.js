import React from "react";

import uuidv4 from "uuid";

/* no update on list element, hence key in list are not really necessary */

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
    (line, i) =>
      i === 1 ? (
        <mark key={uuidv4()} className={`${select}-marker`}>
          &nbsp;
          {line}
          &nbsp;
        </mark>
      ) : (
        <React.Fragment key={uuidv4()}>{line}</React.Fragment>
      )
  );
};

export default Enlighter;
