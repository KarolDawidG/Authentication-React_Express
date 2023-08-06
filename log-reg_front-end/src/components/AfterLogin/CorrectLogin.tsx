import { useEffect, useState } from "react";
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
    redirect(`/login`);
  };

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await axios.post("http://localhost:3001/auth/refresh", {
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
      } catch (error:any) {
        if (error.response && error.response.status === 403) {
          // Handle 403 error here
          setIsAuthenticated(false);
          localStorage.removeItem('refreshToken');
          notify("Your session has expired. Please log in again.");
          redirect('/be-login');
        } else {
          if (error.response) {
            console.error(error.response.data);
            notify(error.response.data);
          } else {
            console.error(error);
            notify('INTERNET_DISCONNECTED');
          }
        }
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleTokenRefresh();
    }
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      redirect('/be-login');
    }
  }, []);

  return (
    <div className="container">
      <Title props="wsedles xd" />
      <div className="left-side">
        <div className="regist__buttons">
          <RedirectBtn to="/">Menu</RedirectBtn>
          <RedirectBtn to="/users">Users</RedirectBtn>
        </div>
      </div>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};
