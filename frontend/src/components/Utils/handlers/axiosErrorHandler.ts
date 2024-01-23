import axios from 'axios';
import { notify } from '../../Others/Notify';

export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      notify(`Error: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      notify('No response from the server. Please try again later.');
    } else {
      notify('Error setting up request. Please try again.');
    }
  } else {
    notify('An unknown error occurred. Please try again.');
  }
  console.error("Error message:", error.message); 
};
