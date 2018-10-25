import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

import Main from "./Main";
import Book from "./Book";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/book/:id" component={Book} />
  </Switch>
);

export default Router;
