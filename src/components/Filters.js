import React from "react";

import { MainContext } from "../pages/Main";
import "./styles/filters.css";

const Filters = () => {
  const filters = [
    { filter: "title", color: "rgb(101, 178, 245)" },
    { filter: "author", color: "rgb(231, 231, 6)" },
    { filter: "subject", color: "palevioletred" },
    { filter: "date", color: "rgb(13, 190, 13)" }
  ];
  return (
    <MainContext.Consumer>
      {({ select, handleSelect }) => (
        <div className="filters-container">
          {filters.map(({ filter, color }) => (
            <button
              key={filter}
              id={filter}
              onClick={handleSelect}
              className="filter-button"
              style={
                select === filter
                  ? {
                      color: "white",
                      background: `${color}`,
                      border: 0
                    }
                  : {
                      color: `${color}`,
                      border: `2px solid ${color}`
                    }
              }
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </MainContext.Consumer>
  );
};

export default Filters;
