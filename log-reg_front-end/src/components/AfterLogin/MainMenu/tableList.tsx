import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../CRUD-question/ShowTables/utils/stringHelpers";
import 'bootstrap/dist/css/bootstrap.css';

export const TableList = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");

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
        handleNetworkError(error);
      });
  }, []);

  return (
    <div className="container-sm">
      <h1 className="p-3 mb-2 bg-success text-white">Wybierz test:</h1>
        {tableNames.map((tableName) => (
          <div className="btn btn-secondary" key={tableName}>
            <Link to={`/quiz/${tableName}`}>
                <button className="btn btn-primary">
                   {replaceCharacter(removeFirstCharacter(removePart(tableName, username)))}
                </button>
            </Link>
          </div>
          ))}
          <Link to="/crud-question">
              <button className="btn btn-danger">Edytuj swoje testy!</button>
          </Link>
        
    </div>
  );
};
