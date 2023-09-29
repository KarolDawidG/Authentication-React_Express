import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import {Updating} from "./Update";

export const ShowTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState("");

  const handleDelete = async (tableName: any) => {
    try {
      await axios.delete(`http://localhost:3001/create-table/${tableName}`);
      const updatedTableNames = tableNames.filter((name) => name !== tableName);
      setTableNames(updatedTableNames);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const handleUpdate = async (tableName: any) => {
    setSelectedTableName(tableName)
    setIsUpdating(true);
  };

  const handleCloseUpdatingMessage = () => {
    setIsUpdating(false);
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
        <p className="show_tables__p"> Lista dost?pnych tabel: </p>
        <ul>
          {tableNames.map((tableName) => (
              <li className="table-name" key={tableName}>
                {replaceCharacter(removeFirstCharacter(removePart(tableName, username)))}
                <div className="btn_container">
                  <button className="btn-show" onClick={() =>handleUpdate(tableName)}>Update</button>
                  <button className="btn-show" onClick={() => handleDelete(tableName)}>
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
        <Updating tableName={selectedTableName} isUpdating={isUpdating} onClose={handleCloseUpdatingMessage} />
      </>
  );
};
