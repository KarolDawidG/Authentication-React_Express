import { LogoutButton } from "../../../Others/LogoutButton"
import "./NavBar.css";

export const NavBar = () =>{

return(
    <>
    <div className="nav">
      <div className="nav_menu">
      <nav>
            <ul>
                <li><button>Contact</button></li>
                <li><button>Abut us</button></li>
                <li><LogoutButton /></li>
            </ul>
        </nav>
      </div>
    </div>
    </>
    )
}