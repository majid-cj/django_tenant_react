import React from "react";
import { doNothing } from "../../utils/utils";

export const InputField = ({
  value,
  onValueChange,
  placeholder,
  icon = null,
  type = "text",
  error = false,
  fixed = false,
  show,
  required,
  onClick = doNothing,
}) => {
  const color = error ? "danger" : value ? "success" : "dark";
  return (
    <div className="d-flex align-items-center justify-content-center p-1">
      {icon && (
        <i
          className={`bi bi-${icon} text-${color} fs-3 mx-1`}
          onClick={onClick}
        />
      )}
      <div className="w-100">
        <input
          className={`form-control border-${color}`}
          type={show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
          disabled={fixed}
          required={required}
        />
      </div>
    </div>
  );
};
