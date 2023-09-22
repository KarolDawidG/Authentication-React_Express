import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { LoginContextType } from "../../Utils/Interfaces/LoginContextType";
import "../../../css/styles.css";
import { Title } from "../../Others/Title";
import { handleLogin } from "./handlers/loginFunctions";
import { handleTokenRefresh } from "./handlers/tokenRefreshFunctions";
import { handleNetworkError } from "./handlers/networkErrorFunctions";

export const LoginContext = createContext<LoginContextType | null>(null);

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const redirect = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      handleLogin(username, password, setIsAuthenticated, redirect);
    } catch (error) {
      handleNetworkError(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && isAuthenticated) {
      handleTokenRefresh(setIsAuthenticated);
    }
  }, [isAuthenticated]);

  return (
    <>
      <LoginContext.Provider
        value={{
          username,
          password,
          setPassword,
          setUsername,
          handleSubmit,
        }}
      >
        <Title props={"Login"} />
        <div className="container">
          <div className="right-side">
            <LoginForm />
            <div className="redirect-btn">
              <RedirectBtn to="/">Menu</RedirectBtn>
              <RedirectBtn to="/regist">Regist</RedirectBtn>
              <RedirectBtn to="/reset-email">Reset</RedirectBtn>
            </div>
          </div>
        </div>
      </LoginContext.Provider>
    </>
  );
};

// login with Captcha

// import React, { createContext, useState, useEffect, useRef} from "react";
// import { useNavigate } from 'react-router-dom';
// import { notify } from "../../Others/Notify";
// import axios from "axios";
// import { ENDPOINT_CAPTCHA} from "../../Utils/links";
// import { LoginForm } from "./LoginForm";
// import { RedirectBtn } from "../../Others/RedirectBtn";
// import {LoginContextType} from '../../Utils/Interfaces/LoginContextType';
// import "../../../css/styles.css";
// import { Title } from "../../Others/Title";
// import { ReCAPTCHA } from "react-google-recaptcha";
// import {handleLogin} from "./handlers/loginFunctions";
// import { handleTokenRefresh } from "./handlers/tokenRefreshFunctions";

// export const LoginContext = createContext<LoginContextType | null>(null);
// export const CaptchaContext = createContext<React.MutableRefObject<ReCAPTCHA | null> | null>(null);

// export const Login = () => {
//     const captchaRef = useRef<ReCAPTCHA | null>(null);
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const redirect = useNavigate();

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (captchaRef.current) {
//             const inputElement = event.currentTarget[0] as HTMLInputElement;
//             const inputVal = inputElement.value;
//             const token = captchaRef.current.getValue();
//             captchaRef.current.reset();
//                 try {
//                     const response = await axios.post(ENDPOINT_CAPTCHA, { inputVal, token });
//                         if (response.data === "Human 👨 👩") {
//                             handleLogin(username, password, setIsAuthenticated, redirect);
//                         }
//                 } catch (error) {
//                     console.error(error);
//                     notify("An error occurred while logging in.");
//                 }
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token && isAuthenticated) {
//             handleTokenRefresh(setIsAuthenticated);
//         }
//     }, [isAuthenticated]);

//     return (
//         <>
//             <LoginContext.Provider
//                 value={{
//                     username,
//                     password,
//                     setPassword,
//                     setUsername,
//                     handleSubmit,
//                 }}
//             >
//                 <CaptchaContext.Provider value={captchaRef}>
//                     <Title props={'Login panel'} />
//                     <div className="container">
//                         <LoginForm />
//                         <div className="left-side">
//                             <div className="regist__buttons">
//                                 <RedirectBtn to="/">Menu</RedirectBtn>
//                                 <RedirectBtn to="/regist">Regist</RedirectBtn>
//                                 <RedirectBtn to="/reset-email">Reset</RedirectBtn>
//                             </div>
//                         </div>
//                     </div>
//                 </CaptchaContext.Provider>
//             </LoginContext.Provider>
//         </>
//     );
// };
