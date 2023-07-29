import React from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { notify } from './Notify';
import 'react-toastify/dist/ReactToastify.css';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {


  const message = 'The user has been logged out!';
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      await axios.get('http://localhost:3001/logout');
      notify(message);
      onLogout();
    } catch (error) {
      console.error(error);
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
