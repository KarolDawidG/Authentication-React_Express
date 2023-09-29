import React, { useContext } from "react";
import {
  backgroundColor,
  preventSpace,
  validateEmail,
  validatePassword,
} from "../../Utils/FormsUtils/forms-utils";
import { RegisterContect, CaptchaContext } from "./Regist";
import { REACT_APP_SITE_KEY } from "../../Utils/links";
import ReCAPTCHA from "react-google-recaptcha";
import "../../../css/styles.css";

export const RegistForm = () => {
  const context = useContext(RegisterContect);
  const contextCapta = useContext(CaptchaContext);

  if (!context || !contextCapta) return null;
  const {
    handleSubmit,
    username,
    password,
    setPassword,
    setUsername,
    email,
    setEmail,
  } = context;
  const captchaRef = contextCapta as React.MutableRefObject<ReCAPTCHA | null>;

  const removeSpecialCharacters = (inputString: string) => {
    return inputString.replace(/[^\w\s]/gi, "");
  };

  return (
    <>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <label className="login-form__label" htmlFor="email">
          {" "}
          Email:{" "}
        </label>
        <input
          className="login-form__input"
          type="email"
          minLength={4}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: validateEmail(email) ? "lightgreen" : "grey",
          }}
          onKeyDown={preventSpace}
          required
        />

        <label className="login-form__label" htmlFor="username">
          {" "}
          Login:{" "}
        </label>
        <input
          className="login-form__input"
          type="text"
          minLength={6}
          maxLength={16}
          id="username"
          value={removeSpecialCharacters(username)}
          onChange={(e) => setUsername(e.target.value)}
          style={{ backgroundColor: `${backgroundColor(username.length, 6)}` }}
          onKeyDown={preventSpace}
          required
        />

        <label className="login-form__label" htmlFor="password">
          {" "}
          Hasło:{" "}
        </label>
        <input
          className="login-form__input"
          type="password"
          minLength={8}
          maxLength={16}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: validatePassword(password) ? "lightgreen" : "grey",
          }}
          onKeyDown={preventSpace}
          required
        />
        <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={captchaRef} />
        <input
          className="login-form__submit"
          type="submit"
          value="Zarejestruj się!"
        />
      </form>
    </>
  );
};
