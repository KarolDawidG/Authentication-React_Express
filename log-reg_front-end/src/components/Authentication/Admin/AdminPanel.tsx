import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { notify } from "../../Others/Notify";
import axios from 'axios';
import { ADMIN_ROLE, ENDPOINT_ADMIN } from "../../Utils/links";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { Loader } from "../../Utils/Loader";
import { Title } from "../../Others/Title";
import jwtDecode from "jwt-decode"; // Importuj bibliotekę do dekodowania JWT

export const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const redirect = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    redirect(`/login`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token); //wyswietla sie w konsoli dwa razy, dlaczego?
    if (!token) {
      return redirect('/be-login');
    }
    
    const decodedToken:any = jwtDecode(token); // Dekoduj token JWT
    const userRole = decodedToken.role; // Odczytaj rolę z tokena
    
    if (userRole === ADMIN_ROLE) {
      setIsLoading(false);
    } else{
      return redirect('/be-login');
    }
  },[]);

  if (isLoading) {
    return <>
      <Loader />
    </>;
  }

  return (
    <div className="container">
      <Title props="Welcome to Admin Panel" />
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
