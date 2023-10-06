import { LogoutButton } from "../Others/LogoutButton"
import { RedirectBtn } from "../Others/RedirectBtn"
import "./UserPanel.css";

export const NavBar = () =>{

return(
    <>
        <nav>
            <ul>
                <li><RedirectBtn to="/crud-question">Crud</RedirectBtn></li>
                <li><LogoutButton /></li>
                
                
            </ul>

        </nav>
    </>
    )
}