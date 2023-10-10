import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

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
    <div className="container-sm">
      <p className="p-3 mb-2 bg-success text-white"> Lista dostępnych tabel: </p>

      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-bordered table-striped mb-0">
          <thead>
            <tr >
              <th scope="row" className="text-center">No.</th>
              <th scope="col" className="text-center">Nazwa tabeli</th>
              <th scope="col" className="text-center">Akcje</th>
            </tr>
          </thead>

          <tbody>
            {tableNames.map((tableName, index) => (
              <tr key={tableName}>
                <th scope="row">{index+1}</th>
                <td>
                  {replaceCharacter(removeFirstCharacter(removePart(tableName, username)))}
                </td>

                 <td>
                  <Link to={`/insert/${username}/${tableName}`}>
                    <button className="btn btn-success center-button">Create</button>
                  </Link>
                      
                  <button
                    onClick={() => handleDelete(tableName)}
                    className="btn btn-danger center-button"
                  >Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
            <caption><p className="text-info">List of egzams</p></caption>
        </table>
      </div>
    </div>
  </>
  );
};
