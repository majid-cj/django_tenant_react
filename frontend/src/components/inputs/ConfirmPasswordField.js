import React, { useState } from "react";
import { matchPassword } from "../../utils/validators";
import { InputField } from "./InputField";

export const ConfirmPasswordField = ({ onValue, password }) => {
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setConfirmPassword(value);
    onValue(value);
    setError(!matchPassword(password.password, value));
  };

  const showPassword = () => setShow(!show);

  return (
    <InputField
      onValueChange={onValueChange}
      value={confirm_password}
      error={error}
      icon="shield-check"
      placeholder="confirm password"
      type="password"
      required={true}
      show={show}
      onClick={showPassword}
    />
  );
};
