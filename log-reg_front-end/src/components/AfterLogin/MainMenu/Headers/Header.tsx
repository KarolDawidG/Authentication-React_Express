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
        <div className="text-white bg-secondary p-1 rounded-1 text-center mb-0">User: {user}</div>
      {nazwaTabeli && (
          <div className="btn btn-secondary">Quiz: {nazwaTabeli}</div>
      )}
    </div>
  );
};
