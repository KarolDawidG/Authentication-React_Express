import { notify } from "../../Others/Notify";
import { INTERNET_DISCONNECTED } from "../links";

export const handleNetworkError = (error: any) => {
  console.error(error);
  if (error.response) {
    notify(error.response.data);
  } else {
    notify(INTERNET_DISCONNECTED);
  }
};
