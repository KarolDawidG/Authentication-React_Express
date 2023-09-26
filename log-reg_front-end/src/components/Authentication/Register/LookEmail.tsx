import { RedirectBtn } from "../../Others/RedirectBtn";
import { Title } from "../../Others/Title";

export const LookEmail = () => {
  return (
    <>
      <Title
        props={"Na podany adres email trafił link aktywacyjny!"}
      />
      <Title props={"Kliknij go, aby dokończyć rejestrację!"}/>
      <div className="container">
        <div className="right-side">
          <div className="redirect-btn">
            <RedirectBtn to="/login">Logowanie</RedirectBtn>
            <RedirectBtn to="/regist">Rejestracja</RedirectBtn>
          </div>
        </div>
      </div>
    </>
  );
};
