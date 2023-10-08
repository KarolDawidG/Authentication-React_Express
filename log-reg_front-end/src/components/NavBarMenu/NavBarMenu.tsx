import React, { useState } from "react";
import "./NavBarMenu.css";
import { Registration } from "../Authentication/Register/Registration";
import { Login } from "../Authentication/Login/Login";

export const NavBarMenu = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegisFormVisible, setIsRegisFormVisible] = useState(false);

  const showLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const showRegisForm = () => {
    setIsRegisFormVisible(!isRegisFormVisible);
  };

  return (
    <nav className="navbar">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="navbar__checkbtn">
        <i>|||</i>
      </label>

      <label className="navbar__logo">Mega-Test</label>
      <ul className="navbar__ul">
        <li>
          <button onClick={showLoginForm} className="navbar__link">
            Log-in
          </button>
        </li>
        <li>
        <button onClick={showRegisForm} className="navbar__link">
            Reg-in
          </button>
        </li>
      </ul>

      {isLoginFormVisible && (
        <div className="navbar__login-form">
          <Login onClose={() => setIsLoginFormVisible(false)}/>
        </div>
      )}

      {isRegisFormVisible && (
        <div className="navbar__login-form">
          <Registration  onClose={() => setIsRegisFormVisible(false)}/>
        </div>
      )}  
    </nav>
  );
};
