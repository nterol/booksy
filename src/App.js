import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Router from "./pages/Routes";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Router} />
      </BrowserRouter>
    );
  }
}

export default App;
