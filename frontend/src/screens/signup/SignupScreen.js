import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signupUser, setAuthErrors } from "../../actions";
import {
  ConfirmPasswordField,
  NameField,
  PasswordField,
  UsernameField,
} from "../../components/inputs";
import { Alert } from "../../components/ui";
import { SIGN_IN_SCREEN } from "../../constants";
import { SignupValidator } from "../../utils/validators";

const SignupScreen = ({ signupUser, setAuthErrors, auth }) => {
  const [signup] = useState(new SignupValidator());
  const history = useHistory();

  const onSignup = () => {
    try {
      const signupData = signup.getSignupData();
      signupUser(signupData, () => {
        history.push(SIGN_IN_SCREEN);
      });
    } catch (error) {
      setAuthErrors(error.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 px-1">
      <form className="col-lg-4 col-md-8 col-10" onSubmit={onSignup}>
        <NameField onValue={(name) => signup.setName(name)} />

        <UsernameField onValue={(username) => signup.setUsername(username)} />

        <PasswordField onValue={(password) => signup.setPassword(password)} />

        <ConfirmPasswordField
          onValue={(confirm_password) =>
            signup.setConfirmPassword(confirm_password)
          }
          password={signup}
        />

        {auth && (
          <Alert message={auth} show={auth !== null} alertType="danger" />
        )}
        <input
          type="submit"
          value="signup"
          className="btn btn-sm btn-danger m-1"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.error.auth,
});
const mapDispatchToProps = {
  signupUser,
  setAuthErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
