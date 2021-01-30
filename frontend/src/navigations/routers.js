import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components/header";
import GroupScreen from "../screens/group/GroupScreen";
import LandingScreen from "../screens/landing/LandingScreen";
import { NotFoundScreen } from "../screens/not_found/NotFoundScreen";
import SigninScreen from "../screens/signin/SigninScreen";
import SignupScreen from "../screens/signup/SignupScreen";
import TodoScreen from "../screens/todo/TodoScreen";
import TodoDetailScreen from "../screens/todo_detail/TodoDetailScreen";

export const Navigation = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={LandingScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/signup" component={SignupScreen} />
          <Route
            path="/groups"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={GroupScreen} />
                <Route path={`${url}/todo`} component={TodoScreen} />
                <Route
                  path={`${url}/todo/:todo_id`}
                  component={TodoDetailScreen}
                />
              </>
            )}
          />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </div>
    </Router>
  );
};
