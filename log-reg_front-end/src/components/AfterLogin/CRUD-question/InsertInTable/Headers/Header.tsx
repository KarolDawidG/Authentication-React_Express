import React, { useContext } from "react";
import "./Header.css";
import { TableListContext } from "../../../tableList";

interface InsertHeaderProps {
  nazwaTabeli?: string;
}

export const Header: React.FC<InsertHeaderProps> = ({ nazwaTabeli }) => {
  const context = useContext(TableListContext);
  if (!context) return null;
  const { username } = context;

  return (
    <div className="insert-container">
      <p className="insert__p-username">Zalogowany użytkownik: {username}</p>
      {nazwaTabeli && (
        <p className="insert__p-tabelname">Nazwa tabeli: {nazwaTabeli}</p>
      )}
    </div>
  );
};
