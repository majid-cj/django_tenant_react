import React from "react";

export default ({ link, icon }) => (
  <li className="nav-item">
    <a href={link} className="nav-link" target="_blank">
      <i className={`bi bi-${icon}`}></i>
    </a>
  </li>
);
