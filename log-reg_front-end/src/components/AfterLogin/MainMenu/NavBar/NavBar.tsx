import { LogoutButton } from "../../../Others/LogoutButton";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars">|||</i>
      </label>

      <label className="logo">Super Testy</label>
          <ul>
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

