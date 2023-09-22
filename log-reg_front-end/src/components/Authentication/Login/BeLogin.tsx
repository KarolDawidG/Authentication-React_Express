import { RedirectBtn } from "../../Others/RedirectBtn";
import { Title } from "../../Others/Title";

export const BeLogin = () => {
  return (
    <>
      <Title
        props={"You are not logged in or do not have access to resources!"}
      />
      <div className="container">
        <div className="right-side">
          <div className="redirect-btn">
            <RedirectBtn to="/login">Login</RedirectBtn>
            <RedirectBtn to="/regist">Regist</RedirectBtn>
            <RedirectBtn to="/after-login">Back!</RedirectBtn>
          </div>
        </div>
      </div>
    </>
  );
};
