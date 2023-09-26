import React from "react";

interface PasswordStatusProps {
  password: string;
  password2: string;
  passwordsMatch: boolean;
}

export const PasswordStatus: React.FC<PasswordStatusProps> = ({
  password,
  password2,
  passwordsMatch,
}) => {
  return (
    <span
      style={{
        color: password && password2 && passwordsMatch ? "green" : "red",
      }}
    >
      {password && password2 && passwordsMatch
        ? "Hasło poprawne!"
        : password || password2
        ? "Hasła nie pasują"
        : "Wpisz hasło"}
    </span>
  );
};
