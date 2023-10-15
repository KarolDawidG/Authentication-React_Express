import React from "react";
import { OptionProps } from "./InterfaceOption";
import "bootstrap/dist/css/bootstrap.css";

export const Option: React.FC<OptionProps> = ({
  label,
  value,
  selected,
  onChange,
}) => {
  return (
    <label className="option-label text-white">
      <input
        type="radio"
        name="option"
        value={value}
        checked={selected}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
