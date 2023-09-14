import axios from "axios";
import { notify } from "../../../Others/Notify";
import { ENDPOINT_REGISTER } from "../../../Utils/links";
import { handleNetworkError } from "../../Login/handlers/networkErrorFunctions";

export const handleReg = async (
    email: string,
    username: string,
    password: string,
    navigate: (path: string) => void 
) => {
  try {
    const response = await axios.post(ENDPOINT_REGISTER, {
      email,
      username,
      password,
    });
        if (response.status === 200) {
            notify(response.data);
            setTimeout(() => navigate(`/`), 1000);
        } else {
            notify(response.data.message);
        }
  } catch (error: any) {
      handleNetworkError(error);
  }
};
