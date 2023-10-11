import { CreateTable } from "../CreateTables/CreateTable";
import { ShowTables } from "../ShowTables/ShowTables";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import { NavBar } from "../../MainMenu/NavBar/NavBar";
import { Header } from "../../MainMenu/Headers/Header";
import { Footer } from "../../../Footer/Footer";
import 'bootstrap/dist/css/bootstrap.css';

export const MenuCrud = () => {
  return (
    <>
      <NavBar/>
      <Header/>
      <div className="container-sm">
        <CreateTable />
        <ShowTables />
        <RedirectBtn to="/after-login">Back</RedirectBtn>
      </div>
      <Footer/>
    </>
  );
};
