import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signinUser, setAuthErrors } from "../../actions";
import { PasswordField, UsernameField } from "../../components/inputs";
import { Alert } from "../../components/ui";
import { HOME_SCREEN, SIGN_UP_SCREEN } from "../../constants";
import { SigninValidator } from "../../utils/validators";

const SigninScreen = ({ signinUser, setAuthErrors, auth }) => {
  const [signin] = useState(new SigninValidator());
  const history = useHistory();

  const onSignin = () => {
    try {
      const signinData = signin.getAuthData();
      signinUser(signinData, () => {
        history.push(HOME_SCREEN);
      });
    } catch (error) {
      setAuthErrors(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="d-flex align-items-center justify-content-center col-12 py-5 px-1">
        <form className="col-lg-4 col-md-8 col-10" onSubmit={onSignin}>
          <UsernameField onValue={(username) => signin.setUsername(username)} />

          <PasswordField onValue={(password) => signin.setPassword(password)} />

          {auth && <Alert message={auth} show={auth !== null} />}
          <input
            type="submit"
            value="signin"
            className="btn btn-sm btn-danger m-1"
          />
        </form>
      </div>
      <Link className="text-dark" to={SIGN_UP_SCREEN}>
        you don't have an account ? create one !
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.error.auth,
});
const mapDispatchToProps = {
  signinUser,
  setAuthErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
