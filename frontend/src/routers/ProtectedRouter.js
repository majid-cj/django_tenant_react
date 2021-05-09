import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UNAUTHORIZED_SCREEN } from '../constants';
import { getToken } from '../services/storages/Auth';

export const ProtectedRouter = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const getAuthenticated = async () => {
      const token = await getToken();
      setAuthenticated(token !== null);
    };
    getAuthenticated();
  }, []);

  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: UNAUTHORIZED_SCREEN,
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    ></Route>
  );
};
