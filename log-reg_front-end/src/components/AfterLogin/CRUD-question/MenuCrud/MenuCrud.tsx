import React from "react";
import { CreateTable } from "../CreateTables/CreateTable";
import { ShowTables } from "../ShowTables/ShowTables";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import { NavBar } from "../../MainMenu/NavBar/NavBar";
import { Header } from "../../MainMenu/Headers/Header";

export const MenuCrud = () => {
  return (
    <>
      <NavBar/>
      <Header/>
      <CreateTable />
      <ShowTables />
      <RedirectBtn to="/after-login">Back</RedirectBtn>
    </>
  );
};
