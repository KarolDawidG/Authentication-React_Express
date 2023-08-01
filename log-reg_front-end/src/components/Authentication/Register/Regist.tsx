import React, { useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { INTERNET_DISCONNECTED, ENDPOINT_REGISTER } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import {RegisterContextType} from '../../Utils/Interfaces/RegisterContextType';
import { RegistForm } from "./RegistForm";
import { Title } from "../../Others/Title";
import "../../../css/styles.css";

export const RegisterContect = createContext<RegisterContextType | null>(null); 

export const Regist: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(ENDPOINT_REGISTER, {
        email,
        username,
        password,
      });
      if (response.status === 200) {
          notify(response.data);
          setTimeout(() => redirect(`/`), 2000);
      } else if (response.status === 401) {
        notify(response.data.message);  
      } else  {
        notify(response.data.message); 
      }
    } catch (error: any) {
      if (error) {
        notify(error.response.data);
      } else {
        notify(INTERNET_DISCONNECTED);
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
      </RegisterContect.Provider>
    </>
  );
};
