import { RedirectBtn } from "./components/Others/RedirectBtn";
import { Title } from "./components/Others/Title";
import "./css/styles.css";

export const Menu = () => {
  return (
    <>
        <div className="title">
            <Title props={'Main Menu'} />  
        </div>

        <div className="container">
            <div className="right-side">
                <div className="main__img">
                  <img src='img/baba.png' alt="Baba cyborg" className="img"/>
                </div>
          
              <div className="redirect-btn">
                    <RedirectBtn to="/regist">Regist</RedirectBtn>
                    <RedirectBtn to="/login">Login</RedirectBtn>
              </div>
          </div>
        </div>
    </>
  );
};
