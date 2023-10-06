import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../Others/Notify";
import axios from "axios";
import { ENDPOINT_REFRESH } from "../Utils/links";
import "../AfterLogin/Quiz/QuizMenu.css";
import { RedirectBtn } from "../Others/RedirectBtn";
import { Title } from "../Others/Title";
import { LogoutButton } from "../Others/LogoutButton";
import "./UserPanel.css";
import { TableList } from "./tableList";

export const UserPanel = () => {
  const redirect = useNavigate();

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
    <>
      <div className="user-panel">
        <div className="menu">
          <RedirectBtn to="/crud-question">Crud</RedirectBtn>
        </div>

        <LogoutButton />
      </div>

      <div className="center-side">
        <h1>Super test</h1>
        <p>Wybierz test, który chcesz pierdolnąć!</p>
        <TableList />
      </div>
    </>
  );
};
