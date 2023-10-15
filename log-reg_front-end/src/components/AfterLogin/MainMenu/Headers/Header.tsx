import React from "react";
import "bootstrap/dist/css/bootstrap.css";

interface InsertHeaderProps {
  nazwaTabeli?: string;
}

export const Header: React.FC<InsertHeaderProps> = ({ nazwaTabeli }) => {
  const user = localStorage.getItem("user");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
        color: "white",
      }}
    >
      <div>
        <p className="btn btn-secondary">Zalogowany użytkownik: {user}</p>
      </div>
      {nazwaTabeli && (
        <div>
          <p className="btn btn-secondary">Nazwa tabeli: {nazwaTabeli}</p>
        </div>
      )}
    </div>
  );
};
