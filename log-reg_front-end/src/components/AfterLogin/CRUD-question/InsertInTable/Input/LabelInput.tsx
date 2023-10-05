import React from "react";
import "./LabelInput.css";

interface LabelInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const LabelInput: React.FC<LabelInputProps> = ({
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
        minLength={5}
        maxLength={250}
        onChange={onChange}
        required
      />
    </label>
  );
};
