import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import { notify } from "./Notify";
import { LOG_OUT, ENDPOINT_LOGOUT } from "../Utils/links";
import { handleNetworkError } from "../Authentication/Login/handlers/networkErrorFunctions";

export const LogoutButton: React.FC = () => {
  const redirect = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      await axios.get(ENDPOINT_LOGOUT);
      notify(LOG_OUT);
      redirect(`/`);
    } catch (error: any) {
      handleNetworkError(error);
    }
  }, [redirect]);

  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
