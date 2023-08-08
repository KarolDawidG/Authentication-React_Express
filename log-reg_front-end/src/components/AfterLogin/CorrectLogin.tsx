import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Title } from "../Others/Title";
import { RedirectBtn } from "../Others/RedirectBtn";
import { LogoutButton } from "../Others/LogoutButton";
import { notify } from "../Others/Notify";
import axios from "axios";

export const CorrectLogin = () => {
  const redirect = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    redirect(`/login`);
  };

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      redirect('/be-login');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/refresh", {
        refreshToken,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        notify("Token refreshed successfully.");
      } else {
        notify("Failed to refresh token.");
      }
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        setIsAuthenticated(false);
        localStorage.removeItem('refreshToken');
        notify("Your session has expired. Please log in again.");
        redirect('/be-login');
      } else {
        console.error(error);
        notify("An error occurred while refreshing the token.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleTokenRefresh();
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="container">
      <Title props="Welcome!" />
      <div className="left-side">
        <div className="regist__buttons">
          <RedirectBtn to="/">Menu</RedirectBtn>
          <RedirectBtn to="/users">Users</RedirectBtn>
        </div>
      </div>
      {isAuthenticated && <LogoutButton onLogout={handleLogout} />}
    </div>
  );
};
