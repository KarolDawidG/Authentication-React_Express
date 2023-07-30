import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { admin } from "../../Utils/links";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { Loader } from "../../Utils/Loader";
import { Title } from "../../Others/Title";

export const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const redirect = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    redirect(`/login  `);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');    
    if (!token) {                                   
      redirect('/be-login');                        
    } else {
      axios.get(admin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.userRole === "admin") {
          setIsLoading(false);
        } else {
          redirect('/'); 
        }
      })
      .catch(error => {
        console.error(error);
        redirect('/be-login');
      });
    }
  }, [redirect]);

  if (isLoading) {
    return <>
        <Loader/>
    </>;
  }

  return (
    <div className="container">
      <Title props="Welcome to Admin Panel"/>
        <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/users">Users</RedirectBtn>
            <RedirectBtn to="/regist">Regist</RedirectBtn>
            <RedirectBtn to="/login">Login</RedirectBtn>
          </div>
        </div> 
          <LogoutButton onLogout={handleLogout} />
    </div>
  );
};


