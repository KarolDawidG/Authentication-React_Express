import React, { useState, createContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ENDPOINT_CAPTCHA } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import {RegisterContextType} from '../../Utils/Interfaces/RegisterContextType';
import { RegistForm } from "./RegistForm";
import { Title } from "../../Others/Title";
import { handleReg } from "./handlers/handleSubmit"; 
import { ReCAPTCHA } from "react-google-recaptcha";
import "../../../css/styles.css";
import { handleNetworkError } from "../Login/handlers/networkErrorFunctions";

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
            if (responseCaptcha.data === "Human 👨 👩"){
              handleReg(email, username, password, redirect);
            }
        } catch (error: any) {
            handleNetworkError(error);
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

          <Title props={'Register'} />
            <div className="container"> 
              <div className="right-side">
                <RegistForm/>
                <div className="redirect-btn">
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
