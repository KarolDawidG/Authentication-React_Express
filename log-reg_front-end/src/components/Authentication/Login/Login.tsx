import React, { createContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { notify } from "../../Others/Notify";
import axios from "axios";
import {ENDPOINT_AUTH, INTERNET_DISCONNECTED, ADMIN_ROLE, ENDPOINT_REFRESH} from "../../Utils/links";
import { LoginForm } from "./LoginForm";
import { RedirectBtn } from "../../Others/RedirectBtn";
import {LoginContextType} from '../../Utils/Interfaces/LoginContextType';
import "../../../css/styles.css";
import { Title } from "../../Others/Title";
import jwtDecode from "jwt-decode";

export const LoginContext  = createContext<LoginContextType  | null>(null); 

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const redirect = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
        try {
          const response = await axios.post(ENDPOINT_AUTH, {
            username,
            password,
          });

          if (response && response.status === 200) {
                const token = response.data.token;
                const refreshToken = response.data.refreshToken;
                
                localStorage.setItem('token', token);   
                localStorage.setItem('refreshToken', refreshToken);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                notify(response.data.message);
                setIsAuthenticated(true);

                const decodedToken:any = jwtDecode(token);
                const userRole = decodedToken.role;

            if (userRole === ADMIN_ROLE) {  
                redirect('/admin');
            } else {
                redirect('/after-login');
            }

          } 
        } catch (error: any) {
          if (error) {
            console.error(error);
            notify(INTERNET_DISCONNECTED);
          }
        }
    };
    

    const handleTokenRefresh = async () => {

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(ENDPOINT_REFRESH, {
            refreshToken,
          });
    
          if (response.status === 200) {
            const token = response.data.token;
            const refreshToken = response.data.refreshToken;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
            notify("Token refreshed successfully.");
          } else {
            notify("Failed to refresh token.");
          }
        } catch (error: any) {
            if (error.response) {
              console.error(error.response.data);
              notify(error.response.data);
            } else {
              console.error(error);
              notify(INTERNET_DISCONNECTED);
            }
          }
      }
    };
  
    // Check if token exists and if not, refresh it
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token && isAuthenticated) {
        handleTokenRefresh();
      }
    }, [isAuthenticated]);

    /////////////////////////////////////////////////////
  return (
  <>
    <LoginContext.Provider 
        value={{
          username,
          password,
          setPassword,
          setUsername,
          handleSubmit
        }}>
      <Title props={'Login panel'}/>
        <div className="container">
          <LoginForm/>
            <div className="left-side">
              <div className="regist__buttons">
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
