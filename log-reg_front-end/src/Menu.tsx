import { RedirectBtn } from "./components/Others/RedirectBtn";
import "./css/styles.css";

export const Menu = () => {
  return (
    <>
      <div className="container">
        <div className="right-side">
          <div className="main__img">
            <img src="img/baba.png" alt="Baba cyborg" className="img" />
          </div>

          <div className="redirect-btn">
            <RedirectBtn to="/regist">Rejestracja</RedirectBtn>
            <RedirectBtn to="/login">Logowanie</RedirectBtn>
          </div>
        </div>
      </div>
    </>
  );
};
