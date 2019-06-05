import React, { Component } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import Search from "../components/Search";
import Library from "../components/Library";
import "../components/styles/main.css";

/*
  Thought that Context was more convenient than Redux for such
  a small SPA with a single "smart" page
*/
export const MainContext = React.createContext();

class MainProvider extends Component {
  state = {
    search: "",
    select: "all",
    results: [],
    filter: false,
    history: [],
    suggestions: [],
    empty: false
  };

  /* * LIFE CYCLES * */

  /* 
    This is so we can have a debounce effect on the query
    launched by handleChange, by wrapping with lodash function
    Also we can retrieve stored search history from localStorage
  */
  componentWillMount() {
    this.debounceQuery = debounce(search => {
      this.searchQuery(search);
    }, 200);

    const retrievedHistory = JSON.parse(localStorage.getItem("historySave"));

    const savedHistory = retrievedHistory === null ? [] : retrievedHistory;

    this.setState(({ history: prevHistory, ...rest }) => {
      return {
        ...rest,
        history: savedHistory
      };
    });
  }

  /*
    This is so search history is saved when the user leave the page
    or if the page refreshes
  */
  componentDidMount() {
    window.addEventListener("beforeunload", this.saveHistory);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveHistory);
  }

  /* * EVENT HANDLER * */

  /*
    HandleChange takes care of the input value 
    and set the suggestion state according to it and using
    value stored in the history state
  */
  handleChange = ({ target: { value } }) => {
    this.setState(
      ({
        select: prevSelect,
        history: prevHistory,
        results: prevResults,
        ...restState
      }) => {
        const suggestionList = prevHistory.reduce((acc, curr) => {
          curr.startsWith(value) && acc.push(curr);
          return acc;
        }, []);
        return {
          ...restState,
          results: value === "" ? [] : prevResults,
          history: prevHistory,
          select: prevSelect,
          search: value,
          suggestions: value === "" ? [] : suggestionList
        };
      }
    );
    this.debounceQuery(value);
  };

  /*
    handle the select options and filter the results state 
    in the filter state searching for the value through it
  */
  handleSelect = ({ target: { id } }) => {
    const { search } = this.state;
    this.setState(({ select: prevSelect, results, ...prevState }) => {
      const newSelect = id === prevSelect ? "all" : id;
      const newFilter =
        results.length > 0 && newSelect !== "all"
          ? this.shelvesGenerator(
              this.filterResults(id, results.flat(), search)
            )
          : false;

      const isIt = newFilter && newFilter.length === 0;
      return {
        ...prevState,
        results,
        select: newSelect,
        filter: newFilter,
        empty: isIt
      };
    });
  };

  /*
    when the user select a suggestion it replace the input value 
    and trigger a search query
  */
  handleSuggestion = ({ target: { id } }) => {
    this.setState(prevState => ({
      ...prevState,
      search: id
    }));
    this.debounceQuery(id);
  };

  /* * QUERY FUNCTION * */

  /*
    Main function. Thought that using async/await would make it more readable
    The logic is : 
    1.retrieve data from query, 
    2.sort it by score
    3.If a select option is on, create a filter state
    4.Rearrange results (and filter) into shelves
  */
  searchQuery = async search => {
    const {
      REACT_APP_API_KEY: apiKey,
      REACT_APP_SEARCH_QUERY: searchQuery
    } = process.env;
    if (search !== "" && search !== " ") {
      try {
        const { data } = await axios.request({
          url: `${searchQuery}${search}`,
          method: "get",
          headers: {
            "x-api-key": apiKey
          }
        });

        this.setState(({ history: prevHistory, select, search, ...rest }) => {
          const sortedData = data.sort(
            ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA
          );
          const newHistory = this.makeHistory([...prevHistory, search]);

          const newFilter =
            sortedData.length > 0 && select !== "all"
              ? this.shelvesGenerator(
                  this.filterResults(select, sortedData, search)
                )
              : false;

          const isIt =
            data.length === 0 || (newFilter && newFilter.length === 0);

          return {
            ...rest,
            search,
            select,
            results: this.shelvesGenerator(sortedData),
            filter: newFilter,
            history: newHistory,
            empty: isIt
          };
        });
      } catch (e) {
        this.setState(({ history: prevHistory, ...rest }) => {
          const newHistory = this.makeHistory([...prevHistory, search]);
          return {
            ...rest,
            history: newHistory,
            empty: true
          };
        });
      }
    }
  };

  /* * UTILS * */

  /* Change search from suggestion component */
  changeSearch = ({ target: { id } }) => {
    this.setState(prevState => ({
      search: id,
      suggestion: []
    }));
  };

  /*
  I am pretty sure there must be a regular expression 
  operating faster than this O(n2) func;

  This is because even with the debounce func, we end up with 
  very large suggestion list filed with junk coming from history

  The idea is to parse the history state and purge every rundundant search;
  This function will filter every little word and keep the most important ones
  For instance It'll get rid of "a", "adv"...and keep "adventure"
*/
  makeHistory = history =>
    history.filter((e, index, arr) =>
      arr.reduce((acc, curr, i) => {
        if (index !== i && curr.startsWith(e)) acc = false;
        return acc;
      }, true)
    );
  /*
      Store history into localstorage
  */
  saveHistory = () => {
    const { history } = this.state;
    localStorage.setItem("historySave", JSON.stringify(history));
  };
  /*
  Clear history from local storage
  */
  clearHistory = () => {
    localStorage.removeItem("history");
    this.setState(prevState => ({
      ...prevState,
      suggestion: [],
      history: []
    }));
  };
  /*
  Create a filter state by parsing the value according 
  to the active select option
  */
  filterResults = (select, results, search) => {
    const needle = search.toLowerCase();
    if (select === "date")
      return results.filter(({ item: { author = "" } }) =>
        author.toLowerCase().includes(needle)
      );
    return results.filter(({ item: { [select]: filtered = "" } }) =>
      filtered.toLowerCase().includes(needle)
    );
  };
  /*
  Parcels the results into pages, each being an array of 4 element
  */
  shelvesGenerator = arr =>
    arr.reduce((acc, curr, i) => {
      acc[Math.floor(i / 4)].push(curr);
      return acc;
    }, Array.from({ length: Math.ceil(arr.length / 4) }, () => []));

  render() {
    const { search, select, results, suggestions, empty, filter } = this.state;

    return (
      <MainContext.Provider
        value={{
          search,
          select,
          handleChange: this.handleChange,
          handleSelect: this.handleSelect,
          handleSuggestion: this.handleSuggestion,
          suggestions,
          clearHistory: this.clearHistory
        }}
      >
        <div className="main-container">
          <Search searchQuery={this.searchQuery} />
          {results.length > 0 &&
            !empty && <Library library={filter ? filter : results} />}
          {empty && (
            <div className="error-container">
              <h1>Sorry...no result was found for your research...</h1>
            </div>
          )}
        </div>
      </MainContext.Provider>
    );
  }
}

export default MainProvider;
