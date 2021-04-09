import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { HOME_SCREEN } from '../constants';

export const UnProtectedRouter = ({ component: Component, ...rest }) => {
  const logged_in = useSelector((state) => state.config.logged_in);

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        logged_in ? (
          <Redirect
            to={{
              pathname: HOME_SCREEN,
              state: {
                from: props.location,
              },
            }}
          />
        ) : (
          <Component />
        )
      }
    ></Route>
  );
};
