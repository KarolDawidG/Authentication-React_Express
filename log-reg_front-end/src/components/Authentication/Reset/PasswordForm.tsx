import { useState } from "react";
import { backgroundColor, preventSpace } from "../../Utils/FormsUtils/forms-utils";

// Dodaj interfejs PassForm jako typ dla propsów komponentu
interface PassForm {
  password: string;
  setPassword: (password: string) => void;
  label: string;
}

export const PasswordForm = ({ password, setPassword, label }: PassForm) => {
  // Usuń lokalny stan hasła

  return (
    <>
      <label htmlFor="password">{label}</label>
      <input
        type="password"
        id="password"
        value={password}
        minLength={8}
        style={{ backgroundColor: `${backgroundColor(password.length, 8)}` }}
        onChange={(e) => setPassword(e.target.value)} // Użyj przekazanej funkcji do ustawienia hasła
        onKeyDown={preventSpace}
        required
      />
      <br />
      <br />
    </>
  );
};
