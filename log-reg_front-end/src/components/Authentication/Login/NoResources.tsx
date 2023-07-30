import { RedirectBtn } from "../../Others/RedirectBtn";

export const NoResources = () => {
  return (
    <div className="container">
      <div className="center-side">
        <h1>There are no resources to display.</h1>
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


