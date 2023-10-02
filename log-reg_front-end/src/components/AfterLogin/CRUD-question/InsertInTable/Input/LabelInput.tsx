import React from "react";
import './LabelInput.css';

interface LabelInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required: boolean;
    maxLength?: number;
  }
  
  export const LabelInput: React.FC<LabelInputProps> = ({ label, name, value, onChange, required, maxLength }) => {
    return (
      <label className="label">
        {label}:
        <input
          className="label__input"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
        />
      </label>
    );
  };