import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

import Main from "./Main";
import BookPage from "./BookPage";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/book/:id" component={BookPage} />
  </Switch>
);

export default Router;
