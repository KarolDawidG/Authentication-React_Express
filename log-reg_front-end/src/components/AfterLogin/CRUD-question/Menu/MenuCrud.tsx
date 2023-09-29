import React from "react";
import { Title } from "../../../Others/Title";
import { CreateTable } from "../CreateTable/CreateTable";
import "./MenuCrud.css";
import { ShowTables } from "../ShowTables/ShowTables";
import { RedirectBtn } from "../../../Others/RedirectBtn";

export const MenuCrud = () => {
  return (
    <>
      <Title props="CRUD" />
      <CreateTable />
      <ShowTables />
      <RedirectBtn to="/after-login">Menu</RedirectBtn>
    </>
  );
};
