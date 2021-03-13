import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UNAUTHORIZED_SCREEN } from "../constants";

export const ProtectedRouter = ({ component: Component, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: UNAUTHORIZED_SCREEN,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    ></Route>
  );
};
