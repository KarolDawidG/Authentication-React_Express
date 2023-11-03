import { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Utils/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import "bootstrap/dist/css/bootstrap.css";
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
      <p className="p-1 mb-1 bg-success text-white">
        {" "}
        List of available tables:
      </p>

      <div className="my-custom-scrollbar table-size">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th scope="row" className="text-center no-cell">
                No.
              </th>
              <th scope="col" className="text-center">
                Table name
              </th>
              <th scope="col" className="text-center actions-cell">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {tableNames.map((tableName, index) => (
              <tr key={tableName}>
                <th scope="row">{index + 1}</th>
                <td>
                  {replaceCharacter(
                    removeFirstCharacter(removePart(tableName, username)),
                  )}
                </td>

                <td>
                  <div className="center-button">
                    <Link to={`/insert/${username}/${tableName}`}>
                      <button className="btn btn-success">Create</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(tableName)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <caption>
            <p className="text-info">List of egzams</p>
          </caption>
        </table>
      </div>
    </>
  );
};
