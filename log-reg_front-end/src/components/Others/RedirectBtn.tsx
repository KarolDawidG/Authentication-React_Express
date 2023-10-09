import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

type RedirectBtnProps = {
  to: string;
  children: string;
};

export const RedirectBtn: React.FC<RedirectBtnProps> = ({ to, children }) => {
  return (
    <Link to={to}>
      <Button variant="primary">{children}</Button>
    </Link>
  );
};
