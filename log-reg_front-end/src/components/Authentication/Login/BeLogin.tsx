import { RedirectBtn } from "../../Others/RedirectBtn";

export const BeLogin = () => {
  return (
    <div className="container">
      <div className="center-side">
        <h1>You are not logged in or do not have access to resources!</h1>
      </div>

      <div className="left-side">
          <div className="regist__buttons">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/regist">Regist</RedirectBtn>
            <RedirectBtn to="/login">Login</RedirectBtn>
          </div>
        </div> 
    </div>
  );
};


