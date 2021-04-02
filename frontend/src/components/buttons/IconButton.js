import React from 'react';
import { doNothing } from '../../utils/utils';

export const IconButton = ({ onClick = doNothing, title = null, active = false, icon, type }) => {
  const button_type = `text-${type || null}`;
  const style = `btn btn-sm btn ${button_type} rounded align-middle`;

  if (active) {
    return (
      <span className={style}>
        {icon && <i className={`bi bi-${icon} fs-5 mx-2`} />}
        {title}
      </span>
    );
  }

  return (
    <a className={style} onClick={onClick}>
      {icon && <i className={`bi bi-${icon} fs-5 mx-2`} />}
      {title}
    </a>
  );
};
