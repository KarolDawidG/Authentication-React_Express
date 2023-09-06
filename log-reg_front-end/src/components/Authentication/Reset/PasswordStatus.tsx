import React from "react";

interface PasswordStatusProps {
  password: string;
  password2: string;
  passwordsMatch: boolean;
}

export const PasswordStatus: React.FC<PasswordStatusProps> = ({ password, password2, passwordsMatch }) => {
  return (
    <span style={{ color: password && password2 && passwordsMatch ? "green" : "red" }}>
      {password && password2 && passwordsMatch
        ? "The passwords match!"
        : password || password2
        ? "The passwords don't match"
        : "Enter the password"}
    </span>
  );
};


