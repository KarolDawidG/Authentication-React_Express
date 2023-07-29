import { Link } from "react-router-dom";
import "./css/styles.css";


export const Menu = () => {
  return (
    <div className="menu">
      <div className="button-menu__options">
        <Link to="/login">
          <button className="logout-button">Login</button>
        </Link>
        <Link to="/regist">
          <button className="logout-button">Regist</button>
        </Link>
      </div>
      
      <div className="menu-image">
        <img src='img/baba.png' alt="Baba cyborg" className="centered-image"/>
      </div>
    </div>
  );
};
