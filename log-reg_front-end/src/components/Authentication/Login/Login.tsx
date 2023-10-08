import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { LoginContextType } from "../../Utils/Interfaces/LoginContextType";
import "../../../css/styles.css";
import { handleLogin } from "./handlers/loginFunctions";
import { handleTokenRefresh } from "./handlers/tokenRefreshFunctions";
import { handleNetworkError } from "./handlers/networkErrorFunctions";

interface Props {
  onClose: () => void;
}
export const LoginContext = createContext<LoginContextType | null>(null);

export const Login: React.FC<Props> = ({onClose}) => {
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
          onClose,
        }}
      >
        <LoginForm />
      </LoginContext.Provider>
    </>
  );
};
