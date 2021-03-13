import React from "react";
import { ErrorBackground } from "../../components/ui";
import BageNotFound from "../../resources/images/404.png";

const NotFoundScreen = () => {
  return <ErrorBackground background={BageNotFound} />;
};

export { NotFoundScreen };
