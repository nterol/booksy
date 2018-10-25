import React from "react";

import { MainContext } from "../pages/Main";
import Suggestion from "./Suggestion";
import Filters from "./Filters";
import "./styles/search.css";

const Search = () => {
  const handlePreventDefault = e => e.preventDefault();
  return (
    <MainContext.Consumer>
      {({ handleChange, search, select }) => (
        <div className="form-search-container">
          <form onSubmit={handlePreventDefault}>
            <div className="inner-form">
              <div className="input-container">
                <input
                  type="text"
                  id="search"
                  value={search}
                  placeholder="type something..."
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <Suggestion />
          <Filters />
        </div>
      )}
    </MainContext.Consumer>
  );
};

export default Search;
