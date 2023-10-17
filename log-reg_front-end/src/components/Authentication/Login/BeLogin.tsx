import { Footer } from "../../AfterLogin/MainMenu/Footer/Footer";
import { NavBarMenu } from "../../NavBarMenu/NavBarMenu";
import "bootstrap/dist/css/bootstrap.css";

export const BeLogin = () => {
  return (
    <>
      <NavBarMenu />
      <div className="p-5">
        <h1 className="text-center text-white p-5">You are not logg-in!</h1>
      </div>
      <Footer/>
    </>
  );
};
