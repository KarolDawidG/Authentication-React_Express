import { RedirectBtn } from "../../Others/RedirectBtn";
import { Title } from "../../Others/Title";

export const BeLogin = () => {
  return (
    <>
      <Title props={"Nie jesteś zalogowany!"} />
      <div className="container">
        <div className="right-side">
          <div className="redirect-btn">
            <RedirectBtn to="/login">Logowanie</RedirectBtn>
            <RedirectBtn to="/regist">Rejestracja</RedirectBtn>
            <RedirectBtn to="/after-login">Cofnij!</RedirectBtn>
          </div>
        </div>
      </div>
    </>
  );
};
