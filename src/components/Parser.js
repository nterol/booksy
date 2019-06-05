import React from "react";

import uuidv4 from "uuid";

/*
  Parser enables to target the <em></em> tag 
  from the matches object and to manipulate it
*/

const Parser = ({ children }) => {
  const replacer = (general, text) => {
    return `*${text}*`;
  };
  /*
    Following regexp target the '<em>some text</em>' pattern
    and isolate the text group in order to access it
    in the above function 'replacer'
  */
  const lines = children
    .replace(/<\s*em[^>]*>([^<]*)<\s*\/\s*em\s*>/g, replacer)
    .split("*");

  return lines.map(
    (line, i) =>
      i === 1 ? (
        <mark key={uuidv4()} className="common-marker">
          &nbsp;
          {line}
          &nbsp;
        </mark>
      ) : (
        <React.Fragment key={uuidv4()}>line</React.Fragment>
      )
  );
};

export default Parser;
