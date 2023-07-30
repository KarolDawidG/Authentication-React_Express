import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { auth } from "../../Utils/links";
import { CorrectLogin } from "../../AfterLogin/CorrectLogin";
import { LoginForm } from "./LoginForm";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import "../../../css/styles.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const redirect = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      try {
        const response = await axios.post(auth, {
          username,
          password,
        });
    
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
          notify('The user has logged in.');
          setIsAuthenticated(true);
          if (username === "root") {
            redirect(`/admin`);
          }
        } else {
          notify('Login failed. Please check your credentials.');
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
    
    const handleLogout = () => {
      setIsAuthenticated(false);
    };
  return (
    <>
      <ToastContainer />
      <div className="center-side">
        <h1 className="regist__title">Login</h1>
      </div>

      <div className="container">
        
        <div className="right-side">
          {!isAuthenticated ? (
            <LoginForm
              handleSubmit={handleSubmit}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          ) : (
            <>
              <CorrectLogin />
              <LogoutButton onLogout={handleLogout} />
            </>
          )}
        </div>

        <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/regist">Regist</RedirectBtn>
            <RedirectBtn to="/reset">Reset</RedirectBtn>
          </div>
        </div>

      </div>
    </>
  );
};
