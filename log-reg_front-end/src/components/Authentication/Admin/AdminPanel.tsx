import { useEffect, useState } from "react";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { admin } from "../../Utils/links";

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
      // Wywołanie zapytania do serwera w celu weryfikacji tokenu
      axios.get(admin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Ustawienie stanu `isLoading` na `false` tylko jeśli token jest prawidłowy i użytkownik ma rolę "admin"
        if (response.data.userRole === "admin") {
          setIsLoading(false);
        } else {
          redirect('/'); // Przekierowanie do innego widoku, jeśli użytkownik nie ma roli "admin"
        }
      })
      .catch(error => {
        console.error(error);
        redirect('/be-login'); // Przekierowanie do widoku logowania, jeśli wystąpił błąd lub token jest nieprawidłowy
      });
    }
  }, [redirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
        <div className="right-side">
                <h1 >Welcome to Admin Panel</h1>
        </div>
        <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/users">Users</RedirectBtn>
            <RedirectBtn to="/regist">Regist</RedirectBtn>
            <RedirectBtn to="/login">Login</RedirectBtn>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div> 
    </div>
  );
};


