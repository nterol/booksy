import React from "react";

import { MainContext } from "../pages/Main";
import "./styles/suggestion.css";

const Suggestion = () => (
  <MainContext.Consumer>
    {({ suggestions, clearHistory, handleSuggestion }) => {
      return suggestions.length > 0 ? (
        <div className="suggestions-container" tabIndex="0">
          {suggestions.map(suggestion => (
            <div
              onClick={handleSuggestion}
              key={suggestion}
              id={suggestion}
              className="suggestion-holder"
            >
              {suggestion}
            </div>
          ))}
          <div
            className="suggestion-holder clear-suggestion"
            onClick={clearHistory}
          >
            Clear history
          </div>
        </div>
      ) : null;
    }}
  </MainContext.Consumer>
);

export default Suggestion;
