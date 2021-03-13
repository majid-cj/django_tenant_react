import React, { useState } from "react";
import { InputField } from "./InputField";

export const SearchField = ({ onValue }) => {
  const [search, setSearch] = useState("");

  const onValueChange = ({ target: { value } }) => {
    setSearch(value);
    onValue(value);
  };

  return (
    <InputField
      onValueChange={onValueChange}
      value={search}
      placeholder="search"
    />
  );
};
