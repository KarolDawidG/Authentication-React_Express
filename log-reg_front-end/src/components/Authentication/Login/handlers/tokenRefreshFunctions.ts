import { notify } from "../../../Others/Notify";
import axios from "axios";
import { ENDPOINT_REFRESH } from "../../../Utils/links";
import { handleNetworkError } from "./networkErrorFunctions";

export const handleTokenRefresh = async (
  setIsAuthenticated: (value: boolean) => void,
) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axios.post(ENDPOINT_REFRESH, {
        refreshToken,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
        notify("Token refreshed successfully.");
      } else {
        notify("Failed to refresh token.");
      }
    } catch (error) {
      handleNetworkError(error);
    }
  }
};
