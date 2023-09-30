import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import {RedirectBtn} from "../../../Others/RedirectBtn";


export const ShowTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");

  const handleDelete = async (tableName: any) => {
    try {
      await axios.delete(`http://localhost:3001/create-table/${tableName}`);
      const updatedTableNames = tableNames.filter((name) => name !== tableName);
      setTableNames(updatedTableNames);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("user");

    if (savedUsername) {
      setUsername(savedUsername);
    }
    axios
        .get(`http://localhost:3001/create-table/${savedUsername}`)
        .then((response) => {
          const {
            data: { tablesUser: tableNamesArray },
          } = response;

          setTableNames(tableNamesArray);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return (
      <>
        <p className="show_tables__p"> Lista dostepnych tabel: </p>
        <ul>
          {tableNames.map((tableName) => (
              <li className="table-name" key={tableName}>
                {replaceCharacter(removeFirstCharacter(removePart(tableName, username)))}
                <div className="btn_container">
                  <RedirectBtn to={`/insert/${username}/${tableName}`}>Create</RedirectBtn>
                  <button className="btn-show" onClick={() => handleDelete(tableName)}>Delete</button>
                </div>
              </li>
          ))}
        </ul>
      </>
  );
};
