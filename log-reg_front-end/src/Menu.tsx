import { NavBarMenu } from "./components/NavBarMenu/NavBarMenu";
import "./css/styles.css";

export const Menu = () => {
  return (
    <>
    <NavBarMenu/>
      <div className="container">
        <div className="right-side">
          <div className="main__img">
            <img src="img/baba.png" alt="Baba cyborg" className="img" />
          </div>
        </div>
      </div>
    </>
  );
};
