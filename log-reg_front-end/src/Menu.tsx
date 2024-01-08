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
          <div className="col-md-6 text-center text-md-start p-4">
            <h2 className="text-white">Multiple-Choice Test Creation App</h2>
            <p className="lead text-white">
              This is a tool that enables you to create, edit, export, import,
              and delete multiple-choice tests of type A, B, C. <br />
              <br />
              Use this application to create and manage tests in a simple and
              efficient manner. We provide an intuitive interface that makes
              working with questions and answers easy. <br />
              <br />
              Let our application simplify the process of test creation and
              management for you, without unnecessary hassle.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
