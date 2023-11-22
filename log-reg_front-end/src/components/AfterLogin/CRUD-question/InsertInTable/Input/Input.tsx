import React from "react";
import { InputProps } from "../../Interface/InputProps";

export const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <label className="label">
      {label}:
      <input
        className="label__input"
        type="text"
        name={name}
        value={value}
        minLength={3}
        maxLength={200}
        onChange={onChange}
        required
      />
    </label>
  );
};
