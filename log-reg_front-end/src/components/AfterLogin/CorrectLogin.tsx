import { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../Others/Notify";
import { LOG_OUT, ENDPOINT_LOGOUT } from "../Utils/links";
import axios from "axios";
import { ENDPOINT_REFRESH } from "../Utils/links";
import "../AfterLogin/Quiz/QuizMenu.css";

export const CorrectLogin = () => {
  const redirect = useNavigate();

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    await axios.get(ENDPOINT_LOGOUT);
    notify(LOG_OUT);
    redirect(`/login`);
  }, [redirect]);

  const handleTokenRefresh = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      redirect("/be-login");
      return null;
    }

    try {
      const response = await axios.post(ENDPOINT_REFRESH, {
        refreshToken,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", newRefreshToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        notify("Token refreshed successfully.");
      } else {
        notify("Failed to refresh token.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("refreshToken");
        notify("Your session has expired. Please log in again.");
        redirect("/be-login");
      } else {
        console.error(error);
        notify("An error occurred while refreshing the token.");
      }
    }
  }, [redirect]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleTokenRefresh();
    }
  }, [handleTokenRefresh]);

  return (
    <div className="user-panel">
      <p>User Panel</p>
      <div className="button-container">
        <Link to="/quiz">
          <button>Wszystkie pytania</button>
        </Link>
        <Link to="/quiz-20">
          <button>Egzamin</button>
        </Link>
        <Link to="/">
          <button>Menu</button>
        </Link>
        <Link to="/crud-question">
          <button>CRUD</button>
        </Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
