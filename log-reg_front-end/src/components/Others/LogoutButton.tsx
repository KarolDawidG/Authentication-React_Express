import React from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notify } from "./Notify";
import { LOG_OUT, ENDPOINT_LOGOUT } from "../Utils/links";
import { handleNetworkError } from "../Authentication/Login/handlers/networkErrorFunctions";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      await axios.get(ENDPOINT_LOGOUT);
      notify(LOG_OUT);
      onLogout();
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
