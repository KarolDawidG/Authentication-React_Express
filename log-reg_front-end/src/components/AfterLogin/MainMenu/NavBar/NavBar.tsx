import { LogoutButton } from "../../../Others/LogoutButton"
import { RedirectBtn } from "../../../Others/RedirectBtn";
import "./NavBar.css";

export const NavBar = () =>{

return(
<>
  <div className="nav">
    <div className="nav_menu">
      <nav>
        <ul>
          <li><RedirectBtn to={`https://react-g-rock-paper-scissors.netlify.app/contact`}>
              Contact</RedirectBtn></li>
          <li><RedirectBtn to={`https://github.com/KarolDawidG`}>
              About</RedirectBtn></li>
          <li><LogoutButton /></li>
        </ul>
      </nav>
    </div>
  </div>
</>
    )
}