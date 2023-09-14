import React from 'react';
import { Link } from 'react-router-dom';

type RedirectBtnProps = {
  to: string;
  children: string;
};

export const RedirectBtn: React.FC<RedirectBtnProps> = ({ to, children }) => {
  return (
        <Link to={to}>
          <button className="button">{children}</button>
        </Link>
  );
};