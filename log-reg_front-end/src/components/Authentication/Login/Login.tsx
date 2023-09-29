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
      localStorage.setItem("user", username);
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
        <Title props={"Logowanie"} />
        <div className="container">
          <div className="right-side">
            <LoginForm />
            <div className="redirect-btn">
              <RedirectBtn to="/">Menu główne</RedirectBtn>
              <RedirectBtn to="/regist">Rejestracja</RedirectBtn>
              <RedirectBtn to="/reset-email">Reset hasła</RedirectBtn>
            </div>
          </div>
        </div>
      </LoginContext.Provider>
    </>
  );
};

