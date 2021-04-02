import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {
  GROUPS_SCREEN,
  HOME_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN,
  TODO_SCREEN,
  UNAUTHORIZED_SCREEN,
} from '../constants';
import { Header } from '../components/header/Header';
import { GroupScreen } from '../screens/group/GroupScreen';
import { NotFoundScreen } from '../screens/not_found/NotFoundScreen';
import { SigninScreen } from '../screens/signin/SigninScreen';
import { SignupScreen } from '../screens/signup/SignupScreen';
import { TodoScreen } from '../screens/todo/TodoScreen';
import { TodoDetailScreen } from '../screens/todo_detail/TodoDetailScreen';
import { initApp } from '../actions';
import { ProtectedRouter } from './ProtectedRouter';
import { UnauthorizedScreen } from '../screens/unauthorized/UnauthorizedScreen';
import { UnProtectedRouter } from './UnProtectedRouter';
import { MainLoader } from '../components/ui';
import { LandingScreen } from '../screens/landing/LandingScreen';

export const Routers = () => {
  const loader = useSelector((state) => state.ui.loader);
  const logged_in = useSelector((state) => state.config.logged_in);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <Router>
      <Header />
      <main className='mt-2 p-2 container'>
        <Switch>
          <Route exact path={HOME_SCREEN} component={LandingScreen} />
          <UnProtectedRouter exact path={SIGN_IN_SCREEN} component={SigninScreen} login={logged_in} />
          <UnProtectedRouter exact path={SIGN_UP_SCREEN} component={SignupScreen} login={logged_in} />
          <Route
            path={GROUPS_SCREEN}
            login={logged_in}
            render={({ match: { url } }) => (
              <>
                <ProtectedRouter exact path={`${url}/`} component={GroupScreen} login={logged_in} />
                <ProtectedRouter
                  exact
                  path={`${url}/:group_id(\\d+)${TODO_SCREEN}`}
                  component={TodoScreen}
                  login={logged_in}
                />
                <ProtectedRouter
                  exact
                  path={`${url}/:group_id(\\d+)${TODO_SCREEN}/:todo_id(\\d+)`}
                  component={TodoDetailScreen}
                  login={logged_in}
                />
              </>
            )}
          />
          <Route exact path={UNAUTHORIZED_SCREEN} component={UnauthorizedScreen} />
          <Route path='*' component={NotFoundScreen} />
        </Switch>
        <MainLoader show={loader} />
      </main>
    </Router>
  );
};
