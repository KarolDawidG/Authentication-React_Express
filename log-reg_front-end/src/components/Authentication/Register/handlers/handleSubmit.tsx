import axios from "axios";
import { notify } from "../../../Others/Notify";
import { INTERNET_DISCONNECTED, ENDPOINT_REGISTER } from "../../../Utils/links";

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
        } else if (response.status === 401) {
        notify(response.data.message);
        } else {
        notify(response.data.message);
        }
  } catch (error: any) {
    if (error) {
      notify(error.response.data);
    } else {
      notify(INTERNET_DISCONNECTED);
    }
  }
};
