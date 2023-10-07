import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import { RedirectBtn } from "../../../Others/RedirectBtn";

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
      <p className="show_tables__p"> Lista dostępnych tabel: </p>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nazwa tabeli</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tableNames.map((tableName) => (
            <tr key={tableName}>
              <td>
                {replaceCharacter(
                  removeFirstCharacter(removePart(tableName, username))
                )}
              </td>
              <td>
                <div className="btn_container">
                  <RedirectBtn to={`/insert/${username}/${tableName}`}>Create</RedirectBtn><br/>
                  <button className="btn-show"onClick={() => handleDelete(tableName)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};
