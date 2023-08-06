import React from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { notify } from './Notify';
import { INTERNET_DISCONNECTED, LOG_OUT, ENDPOINT_LOGOUT} from '../Utils/links';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {


  
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      await axios.get(ENDPOINT_LOGOUT);
      notify(LOG_OUT);
      onLogout();
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message);
      } else {
        notify(INTERNET_DISCONNECTED);
      }
    }
  };

  return (
    <>
      <ToastContainer/>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
    </>
  );
};
