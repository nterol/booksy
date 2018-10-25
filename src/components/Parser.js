import React from "react";

/*
  Parser enables to target the <em></em> tag 
  from the matches object and to manipulate it
*/

const Parser = ({ children }) => {
  const replacer = (general, text) => {
    return `<mark class="common-marker">&nbsp;${text}&nbsp;</mark>`;
  };
  /*
    Following regexp target the '<em>some text</em>' pattern
    and isolate the text group in order to access it
    in the above function 'replacer'
  */
  const lines = children.replace(
    /<\s*em[^>]*>([^<]*)<\s*\/\s*em\s*>/g,
    replacer
  );
  /*
    the dangerouslySetInnerHTML function parses the object string
    received from the const lines and transform what can be in HTML
  */
  return <pre dangerouslySetInnerHTML={{ __html: lines }} />;
};

export default Parser;
