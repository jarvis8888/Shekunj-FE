import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

import { isAuthenticated } from "../utils";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import PageNotFound from "../pages/PageNotFound";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Switch>
          <Route exact path={rest.path} component={Component} />
          <Route component={PageNotFound} />
        </Switch>
      )}
    />
  );
}

export default PublicRoute;
