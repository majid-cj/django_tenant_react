import React, { useState } from "react";
import { validatePassword } from "../../utils/validators";
import { InputField } from "./InputField";

export const PasswordField = ({ onValue }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setPassword(value);
    onValue(value);
    setError(!validatePassword(value));
  };

  const showPassword = () => setShow(!show);

  return (
    <InputField
      onValueChange={onValueChange}
      value={password}
      error={error}
      icon="shield-lock"
      placeholder="password"
      type="password"
      required={true}
      show={show}
      onClick={showPassword}
    />
  );
};
