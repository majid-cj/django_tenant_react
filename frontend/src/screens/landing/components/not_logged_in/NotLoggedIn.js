import React from "react";
import { Link } from "react-router-dom";
import { SIGN_IN_SCREEN } from "../../../../constants";

export const NotLoggedIn = () => {
  return (
    <div className="row col-12">
      <h3>Django Tenant React</h3>
      <p>a simple todo list app, powered with react and django</p>
      <div className="button-group">
        <Link to={SIGN_IN_SCREEN} className="btn btn-sm btn-outline-success">
          sign in to use thise service
        </Link>
      </div>
    </div>
  );
};
