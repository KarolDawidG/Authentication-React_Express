import React from "react";
import './Header.css';

interface InsertHeaderProps {
  username: string | any;
  nazwaTabeli?: string;
}

export const Header: React.FC<InsertHeaderProps> = ({ username, nazwaTabeli }) => {
  return (
    <div className="insert-container">
      <p className="insert__p-username">Zalogowany użytkownik: {username}</p>
      {nazwaTabeli && (
        <p className="insert__p-tabelname">Nazwa tabeli: {nazwaTabeli}</p>
      )}
    </div>
  );
};
