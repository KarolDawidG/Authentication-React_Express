import { Footer } from "../../AfterLogin/MainMenu/Footer/Footer";
import { NavBarMenu } from "../../NavBarMenu/NavBarMenu";

export const LookEmail = () => {
  return (
    <>
      <NavBarMenu />
        <div className="text-center text-white p-5">
          <h1 className="p-5">An activation link has been sent to the provided email address!</h1>
        </div>
      <Footer/>
    </>
  );
};
