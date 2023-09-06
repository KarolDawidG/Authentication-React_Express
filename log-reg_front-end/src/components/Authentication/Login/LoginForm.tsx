import React, { useContext } from "react";
import { backgroundColor, preventSpace } from "../../Utils/FormsUtils/forms-utils";
import { CaptchaContext, LoginContext } from './Login';
import ReCAPTCHA from "react-google-recaptcha";
import "../../../css/styles.css";

// const REACT_APP_SECRET_KEY = "6Lc-ufQnAAAAAFHAfXXa-u2F7gMpSaBHRT323NgS";
const REACT_APP_SITE_KEY = "6Lc-ufQnAAAAAACcAYt0QXQIBxulSTBdUUcAXQE-";

export const LoginForm = () => {
  const context = useContext(LoginContext);
  const contextCapta = useContext(CaptchaContext);

  if (!context || !contextCapta) return null;
    const { handleSubmit, username, password, setPassword, setUsername } = context;
    const captchaRef = contextCapta as React.MutableRefObject<ReCAPTCHA | null>;

  return (
      <div className="right-side">
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
              style={{ backgroundColor: `${backgroundColor(username.length, 4)}` }}
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
              style={{ backgroundColor: `${backgroundColor(password.length, 8)}` }}
              onKeyDown={preventSpace}
              required
          />
          <br />
          <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={captchaRef} />

          <input className="login-form__submit" type="submit" value="Login" />
        </form>
      </div>
  );
};
