import React, { useState } from "react";
import { validateUsername } from "../../utils/validators";
import { InputField } from "./InputField";

export const UsernameField = ({ onValue }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setUsername(value);
    onValue(value);
    setError(!validateUsername(value));
  };

  return (
    <InputField
      onValueChange={onValueChange}
      value={username}
      error={error}
      icon="person-badge"
      placeholder="username"
      required={true}
    />
  );
};
