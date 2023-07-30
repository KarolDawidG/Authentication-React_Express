import React from "react";
import {LoginFormProps} from '../../Utils/Interfaces/LoginFormProps';
import { backgroundColor, preventSpace } from "../../../components/Utils/FormsUtils/forms-utils";
import "../../../css/styles.css";

export const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword,
}) => {

  return (
    <>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <label className="login-form__label" htmlFor="username">
          Username:
        </label>
        <input
          className="login-form__input"
          minLength={4}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{backgroundColor: `${backgroundColor(username.length, 4)}`}}
          onKeyDown={preventSpace}
          required
        />
        <br />

        <label className="login-form__label" htmlFor="password">
          Password:
        </label>
        <input
          className="login-form__input"
          minLength={8}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{backgroundColor: `${backgroundColor(password.length, 8)}`}}
          onKeyDown={preventSpace}
          required
        />
        <br />

        <input className="login-form__submit" type="submit" value="Login" />
        
      </form>
    </>
  );
};
