import React, { useState } from "react";
import { validateName } from "../../utils/validators";
import { InputField } from "./InputField";

export const NameField = ({ onValue }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setName(value);
    onValue(value);
    setError(!validateName(value));
  };

  return (
    <InputField
      onValueChange={onValueChange}
      value={name}
      error={error}
      icon="info-circle"
      placeholder="name"
      required={true}
    />
  );
};
