import React, { useState, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT_CAPTCHA } from "../../Utils/links";
import { RegisterContextType } from "../../Utils/Interfaces/RegisterContextType";
import { handleReg } from "./handlers/handleSubmit";
import { ReCAPTCHA } from "react-google-recaptcha";
import { handleNetworkError } from "../Login/handlers/networkErrorFunctions";
import { RegForm } from "./RegForm";

interface Props {
  onClose: () => void;
}

export const RegisterContect = createContext<RegisterContextType | null>(null);
export const CaptchaContext =
  createContext<React.MutableRefObject<ReCAPTCHA | null> | null>(null);

export const Registration: React.FC<Props> = ({ onClose }) => {
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
        const responseCaptcha = await axios.post(ENDPOINT_CAPTCHA, {
          inputVal,
          token,
        });
        if (responseCaptcha.data === "Human 👨 👩") {
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
          setUsername,
          onClose,
        }}
      >
        <CaptchaContext.Provider value={captchaRef}>
          <RegForm />
        </CaptchaContext.Provider>
      </RegisterContect.Provider>
    </>
  );
};
