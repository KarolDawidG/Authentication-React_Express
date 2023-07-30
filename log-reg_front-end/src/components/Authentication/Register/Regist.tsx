import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { register } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { RegistForm } from "./RegistForm";
import "../../../css/styles.css";


export const Regist: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(register, {
        email,
        username,
        password,
      });
      if (response.status === 200) {
          notify(response.data);
          setTimeout(() => redirect(`/`), 2000);
      } else if (response.status === 401) {
        notify(response.data);  
      } else  {
        notify(response.data); 
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        notify(error.response.data); 
      } else {
        notify('Error occurred. Please check your network connection.');
      }
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="center-side">
        <h1 className="regist__title">Registration</h1>
      </div>

      <div className="container">
        <div className="right-side">
          <RegistForm
            handleSubmit={handleSubmit}
            email={email}
            username={username}
            password={password}
            setEmail={setEmail}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>

        <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/login">Login</RedirectBtn>
          </div>
        </div>

      </div>
    </>
  );
};
