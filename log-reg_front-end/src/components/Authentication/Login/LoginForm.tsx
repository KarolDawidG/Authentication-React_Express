import React, { useContext } from "react";
import {
  backgroundColor,
  preventSpace,
  validatePassword,
} from "../../Utils/FormsUtils/forms-utils";
import { LoginContext } from "./Login";
import "../../../css/styles.css";

export const LoginForm = () => {
  const context = useContext(LoginContext);
  if (!context) return null;
  const { handleSubmit, username, password, setPassword, setUsername } =
    context;

  return (
    <>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <label className="login-form__label" htmlFor="username">
          {" "}
          Login:{" "}
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

        <label className="login-form__label" htmlFor="password">
          {" "}
          Hasło:{" "}
        </label>
        <input
          className="login-form__input"
          minLength={8}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: validatePassword(password) ? "lightgreen" : "grey",
          }}
          onKeyDown={preventSpace}
          required
        />

        <input className="login-form__submit" type="submit" value="Zaloguj się!" />
      </form>
    </>
  );
};

// login with Captcha

// import React, { useContext } from "react";
// import { backgroundColor, preventSpace } from "../../Utils/FormsUtils/forms-utils";
// import { CaptchaContext, LoginContext } from './Login';
// import { REACT_APP_SITE_KEY } from "../../Utils/links";
// import ReCAPTCHA from "react-google-recaptcha";
// import "../../../css/styles.css";

// export const LoginForm = () => {
//   const context = useContext(LoginContext);
//   const contextCapta = useContext(CaptchaContext);

//   if (!context || !contextCapta) return null;
//     const { handleSubmit, username, password, setPassword, setUsername } = context;
//     const captchaRef = contextCapta as React.MutableRefObject<ReCAPTCHA | null>;

//   return (
//       <div className="right-side">
//         <form className="login-form__form" onSubmit={handleSubmit}>
//           <label className="login-form__label" htmlFor="username">
//             Username:
//           </label>

//           <input
//               className="login-form__input"
//               minLength={4}
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               style={{ backgroundColor: `${backgroundColor(username.length, 4)}` }}
//               onKeyDown={preventSpace}
//               required
//           />
//           <br />

//           <label className="login-form__label" htmlFor="password">
//             Password:
//           </label>
//           <input
//               className="login-form__input"
//               minLength={8}
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{ backgroundColor: `${backgroundColor(password.length, 8)}` }}
//               onKeyDown={preventSpace}
//               required
//           />
//           <br />
//           <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={captchaRef} />

//           <input className="login-form__submit" type="submit" value="Login" />
//         </form>
//       </div>
//   );
// };
