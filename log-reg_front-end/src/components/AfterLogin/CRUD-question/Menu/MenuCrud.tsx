import React from "react";
import { CreateTable } from "../CreateTables/CreateTable";
import "./MenuCrud.css";
import { ShowTables } from "../ShowTables/ShowTables";
import { RedirectBtn } from "../../../Others/RedirectBtn";

export const MenuCrud = () => {
  return (
    <>
    
      <CreateTable />
      <ShowTables />
      <RedirectBtn to="/after-login">Menu</RedirectBtn>
    </>
  );
};
