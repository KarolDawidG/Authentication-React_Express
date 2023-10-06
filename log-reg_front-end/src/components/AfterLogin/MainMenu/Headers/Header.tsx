import React from "react";
import "./Header.css";

interface InsertHeaderProps {
  nazwaTabeli?: string;
}

export const Header: React.FC<InsertHeaderProps> = ({ nazwaTabeli }) => {
const user = localStorage.getItem("user");

  return (
    <div className="insert-container">
      <p className="insert__p-username">Zalogowany użytkownik: {user}</p>
      {nazwaTabeli && (
        <p className="insert__p-tabelname">Nazwa tabeli: {nazwaTabeli}</p>
      )}
    </div>
  );
};
