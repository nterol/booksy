import React from "react";

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
    .splice("*");

  return lines.map(
    (line, i) =>
      i === 1 ? (
        <mark className="common-marker">
          &nbsp;
          {line}
          &nbsp;
        </mark>
      ) : (
        line
      )
  );
};

export default Parser;
