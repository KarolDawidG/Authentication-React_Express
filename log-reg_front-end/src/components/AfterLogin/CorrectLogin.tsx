import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Title } from "../Others/Title";
import { RedirectBtn } from "../Others/RedirectBtn";
import { LogoutButton } from "../Others/LogoutButton";

export const CorrectLogin = () => {
  const redirect = useNavigate();

  const handleLogout = () => {
    redirect(`/login  `);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');    
    if (!token) {                                   
      redirect('/be-login');                        
    } 
  }, [redirect]);

  return (
    <div className="container">
      <Title props="wsedles xd"/>
        <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/users">Users</RedirectBtn>
          </div>
        </div> 
          <LogoutButton onLogout={handleLogout} />
    </div>
  );
};


