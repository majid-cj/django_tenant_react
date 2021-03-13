import React from "react";
import { Redirect, Route } from "react-router-dom";
import { HOME_SCREEN } from "../constants";

export const UnProtectedRouter = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          return (
            <Redirect
              to={{
                pathname: HOME_SCREEN,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    ></Route>
  );
};
