import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { NavBarMenu } from "./components/NavBarMenu/NavBarMenu";
import { Footer } from './components/AfterLogin/MainMenu/Footer/Footer';

export const Menu = () => {
  return (
    <>
      <NavBarMenu />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="main__img">
              <img src="img/baba.png" alt="Baba cyborg" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            {"aplikacja do robienia testów"}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
