import React from "react";
import { useSelector } from "react-redux";
import { GroupsLists, NotLoggedIn } from "./components";

export const LandingScreen = () => {
  const logIn = useSelector((state) => state.config.logged_in);
  if (!logIn) return <NotLoggedIn />;

  return <GroupsLists />;
};
