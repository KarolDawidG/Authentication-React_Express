import { useEffect, useState } from "react";
import axios from "axios";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../CRUD-question/ShowTables/utils/stringHelpers";
import { Link } from "react-router-dom";
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";
import './TableList.css';

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
    <div className="container__table-list">
      <h1>Wybierz test: </h1>
      <ul className="ul__table-list">
        {tableNames.map((tableName) => (
          <li className=" li__table-list" key={tableName}>
            <Link to={`/quiz/${tableName}`}>
              <button>{replaceCharacter(removeFirstCharacter(removePart(tableName, username)))}</button>
            </Link>
          </li>
          ))}
      </ul>
    </div>
  );
};
