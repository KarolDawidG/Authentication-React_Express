import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

type RedirectBtnProps = {
  to: string;
  children: string;
};

export const RedirectBtn: React.FC<RedirectBtnProps> = ({ to, children }) => {
  return (
    <Link to={to}>
      <button className="btn btn-outline-secondary btn-lg">{children}</button>
    </Link>
  );
};
