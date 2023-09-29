import axios from "axios";
import jwtDecode from "jwt-decode";
import { notify } from "../../../Others/Notify";
import { ADMIN_ROLE, ENDPOINT_AUTH } from "../../../Utils/links";
import { handleNetworkError } from "./networkErrorFunctions";

export const handleLogin = async (
  username: string,
  password: string,
  setIsAuthenticated: (value: boolean) => void,
  redirect: (to: string) => void,
) => {
  try {
    const response = await axios.post(ENDPOINT_AUTH, {
      username,
      password,
    });

    if (response && response.status === 200) {
      const token = response.data.token;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      notify(response.data.message);
      setIsAuthenticated(true);

      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.role;
      if (userRole === ADMIN_ROLE) {
        redirect("/admin");
      } else {
        redirect("/after-login");
      }
    }
  } catch (error: any) {
    if (error) {
      handleNetworkError(error);
    }
  }
};
