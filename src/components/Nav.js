import React from "react";

import "./styles/nav.css";

const Nav = ({ nav, page, total }) => (
  <div className="arrow-container">
    <a onClick={nav} href="#library">
      <div
        id="back"
        className={`arrow back-arrow ${page > 0 ? "" : "unactive"}`}
      />
    </a>
    <div>{`page ${page + 1} of ${total}`}</div>
    <a onClick={nav} href="#library">
      <div
        id="next"
        className={`arrow next-arrow ${
          total > 1 && page + 1 < total ? "" : "unactive"
        }`}
      />
    </a>
  </div>
);

export default Nav;
