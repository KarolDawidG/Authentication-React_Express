import React, { useContext } from "react";
import { backgroundColor, preventSpace, validateEmail } from "../../../components/Utils/FormsUtils/forms-utils";
import {RegisterContect} from './Regist';
import "../../../css/styles.css";


export const RegistForm = () => {
  const context = useContext(RegisterContect);
    if(!context) return null;
      const {handleSubmit, username, password, setPassword, setUsername, email, setEmail} = context;

  return (
    <div className="right-side">
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
        style={{ backgroundColor: validateEmail(email) ? "lightcoral" : "grey" }}
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
        style={{backgroundColor: `${backgroundColor(username.length, 6)}`}}
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
    </div>
  );
};
