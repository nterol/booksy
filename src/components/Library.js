import React, { Component } from "react";

import Shelf from "./Shelf";
import Nav from "./Nav";

class Library extends Component {
  state = {
    page: 0
  };

  pageHandler = ({ target: { id } }) => {
    console.log("nav handler", id);
    this.setState(({ page: prevPage }) => ({
      page: id === "next" ? prevPage + 1 : prevPage - 1
    }));
  };

  render() {
    const { page } = this.state;
    const { library } = this.props;
    return (
      <div
        id="library"
        className="library-container"
        style={
          {
            // display: "flex",
            // flexDirection: "column"
          }
        }
      >
        <Shelf shelf={library[page]} />
        <Nav nav={this.pageHandler} page={page} total={library.length} />
      </div>
    );
  }
}

export default Library;
