import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../../Others/Title";
import { CreateTable } from "../CreateTable/CreateTable";
import './MenuCrud.css';
import { ShowTables } from "../ShowTables/ShowTables";

export const MenuCrud = () => {

  return (
    <>
        <Title props="CRUD"/>
        <CreateTable/>
        <ShowTables/>
        <Link to="/after-login">
          <button>Menu</button>
        </Link>
    </>
  );
};
