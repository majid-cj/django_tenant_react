import React from "react";
import { doNothing } from "../../utils/utils";

export const IconButton = ({
  onClick = doNothing,
  title = null,
  icon,
  type,
}) => {
  const button_type = type ? `btn-${type}` : null;
  return (
    <a
      className={`btn btn-sm btn ${button_type} rounded align-middle`}
      onClick={onClick}
    >
      {icon && <i className={`bi bi-${icon} fs-5 mx-2`} />}
      {title}
    </a>
  );
};
