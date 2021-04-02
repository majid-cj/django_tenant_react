import React from 'react';
import { useSelector } from 'react-redux';
import { GroupsLists, NotLoggedIn } from './components';

export const LandingScreen = () => {
  const logged_in = useSelector((state) => state.config.logged_in);

  if (!logged_in) return <NotLoggedIn />;

  return <GroupsLists />;
};
