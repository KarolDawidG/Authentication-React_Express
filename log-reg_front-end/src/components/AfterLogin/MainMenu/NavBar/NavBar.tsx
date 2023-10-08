import { LogoutButton } from "../../../Others/LogoutButton";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i>|||</i>
      </label>

      <label className="logo">Mega-Test</label>
          <ul className="navbar__ul">
              <li>
                <a href="https://github.com/KarolDawidG">About</a>
              </li>
              <li>
                <a href="https://react-g-rock-paper-scissors.netlify.app/contact">Contact</a>
              </li>
              <li>
                <LogoutButton />
              </li>
          </ul>
    </nav>
  );
};

