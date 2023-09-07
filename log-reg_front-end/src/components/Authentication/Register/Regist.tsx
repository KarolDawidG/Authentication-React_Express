import React, { useState, createContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { INTERNET_DISCONNECTED, ENDPOINT_CAPTCHA } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import {RegisterContextType} from '../../Utils/Interfaces/RegisterContextType';
import { RegistForm } from "./RegistForm";
import { Title } from "../../Others/Title";
import { handleReg } from "./handlers/handleSubmit"; 
import { ReCAPTCHA } from "react-google-recaptcha";
import "../../../css/styles.css";

export const RegisterContect = createContext<RegisterContextType | null>(null); 
export const CaptchaContext = createContext<React.MutableRefObject<ReCAPTCHA | null> | null>(null);

export const Regist: React.FC = () => {
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (captchaRef.current) {
      const inputElement = event.currentTarget[0] as HTMLInputElement; 
      const inputVal = inputElement.value;
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
        try {
          const responseCaptcha = await axios.post(ENDPOINT_CAPTCHA, { inputVal, token });
          console.log(responseCaptcha.data);
            if (responseCaptcha.data === "Human 👨 👩"){
              handleReg(email, username, password, redirect);
            }
        } catch (error: any) {
          if (error) {
            notify(error.response.data);
          } else {
            notify(INTERNET_DISCONNECTED);
          }
        }
     }
  };

  return (
    <>
    <RegisterContect.Provider 
        value={{
                handleSubmit,
                email,
                username,
                password,
                setEmail,
                setPassword,
                setUsername
              }}>
        <CaptchaContext.Provider value={captchaRef}>
          <Title props={'Register panel'}/>
            <div className="container">
                <RegistForm/>
              <div className="left-side">
                <div className="regist__buttons">
                  <RedirectBtn to="/">Menu</RedirectBtn>
                  <RedirectBtn to="/login">Login</RedirectBtn>
                </div>
              </div>
            </div>
        </CaptchaContext.Provider>
      </RegisterContect.Provider>
    </>
  );
};
