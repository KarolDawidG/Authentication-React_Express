import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

interface InsertHeaderProps {
  nazwaTabeli?: string;
}

export const Header: React.FC<InsertHeaderProps> = ({ nazwaTabeli }) => {
  const user = localStorage.getItem("user");

  return (
    <div className="card">
      <div className="card-body bg-secondary">
        <h3 className="card-title">Zalogowany użytkownik: {user}</h3>
        {nazwaTabeli && ( <p className="card-text">Nazwa tabeli: {nazwaTabeli}</p> )}
      </div>
    </div>
  );
};
