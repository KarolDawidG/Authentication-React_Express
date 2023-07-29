import React from "react";
import "../../../css/styles.css";
import {RegistFormProps} from '../../Utils/Interfaces/RegistFormProps';
import { backgroundColor, preventSpace, validateEmail } from "../../../components/Utils/FormsUtils/forms-utils";

export const RegistForm: React.FC<RegistFormProps> = ({
  handleSubmit,
  email,
  username,
  setEmail,
  setUsername,
  setPassword,
  password,
}) => {
  const isEmailValid = validateEmail(email);
  return (
    <form className="login-form__form" onSubmit={handleSubmit}>
      <label className="login-form__label" htmlFor="email">
        Email:
      </label>
      <input
        className="login-form__input"
        type="email"
        minLength={4}
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ backgroundColor: isEmailValid ? "lightcoral" : "grey" }}
        onKeyDown={preventSpace}
        required
      />
      
      <br />

      <label className="login-form__form" htmlFor="username">
        Username:
      </label>
      <input
        className="login-form__input"
        type="text"
        minLength={6}
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{backgroundColor: `${backgroundColor(username.length, 4)}`}}
        onKeyDown={preventSpace}
        required
      />
      <br />

      <label className="login-form__form" htmlFor="password">
        Password:
      </label>
      <input
        className="login-form__input"
        type="password"
        minLength={8}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{backgroundColor: `${backgroundColor(password.length, 8)}`}}
        onKeyDown={preventSpace}
        required
      />
      <br />

      <input className="login-form__submit" type="submit" value="Register" />
    </form>
  );
};
