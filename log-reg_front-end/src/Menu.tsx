import "bootstrap/dist/css/bootstrap.min.css";
import { NavBarMenu } from "./components/NavBarMenu/NavBarMenu";
import { Footer } from "./components/AfterLogin/MainMenu/Footer/Footer";

export const Menu = () => {
  return (
    <>
      <NavBarMenu />
      <div className="container-sm">
        <div className="row">
          <div className="col-md-6">
            <div className="main__img">
              <img src="img/baba.png" alt="Baba cyborg" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <p className="h2 text-white">Aplikacja do robienia testów</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
