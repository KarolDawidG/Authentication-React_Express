import { CreateTable } from "./CreateTables/CreateTable";
import { ShowTables } from "./ShowTables/ShowTables";
import { NavBar } from "../../MainMenu/NavBar/NavBar";
import { Header } from "../../MainMenu/Headers/Header";
import { Footer } from "../../MainMenu/Footer/Footer";
import "bootstrap/dist/css/bootstrap.css";

export const MenuCrud = () => {
  return (
    <>
      <NavBar />
      <Header />
      <div className="container-sm text-md-start p-0">
        <CreateTable />
        <ShowTables />
      </div>
      <Footer />
    </>
  );
};
