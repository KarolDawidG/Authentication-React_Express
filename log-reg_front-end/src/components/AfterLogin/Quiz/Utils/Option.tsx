import React from "react";
import { OptionProps } from "./InterfaceOption";

export const Option: React.FC<OptionProps> = ({
  label,
  value,
  selected,
  onChange,
}) => {
  return (
    <label className="option-label">
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
