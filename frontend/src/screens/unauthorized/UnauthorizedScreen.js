import React from "react";
import { ErrorBackground } from "../../components/ui";
import Unauthorized from "../../resources/images/unauthorized.png";

export const UnauthorizedScreen = () => {
  return <ErrorBackground background={Unauthorized} />;
};
