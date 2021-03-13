import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { HOME_SCREEN } from "../../constants";
import NavLink from "./NavLink";
import { Background } from "./Background";
import { signoutUser } from "../../actions";

const Header = ({ login, signoutUser }) => {
  return (
    <header style={{ height: "100%" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={HOME_SCREEN}>
            React Tenant React
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink link="https://twitter.com/majidcj" icon="twitter" />

              <NavLink link="https://github.com/majid-cj" icon="github" />

              <NavLink
                link="https://linkedin.com/in/majid-cj"
                icon="linkedin"
              />
            </ul>

            {login && (
              <a
                onClick={() => {
                  signoutUser();
                }}
                className="btn btn-sm"
              >
                <i className="fs-4 bi bi-box-arrow-right" />
              </a>
            )}
          </div>
        </div>
      </nav>

      <Background />
    </header>
  );
};

const mapStatetoProps = (state) => ({
  login: state.config.logged_in,
});

const mapDispatchToProps = {
  signoutUser,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
