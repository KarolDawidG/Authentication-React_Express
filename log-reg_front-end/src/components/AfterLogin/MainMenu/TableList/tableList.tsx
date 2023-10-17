import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../../CRUD-question/ShowTables/utils/stringHelpers";
import "bootstrap/dist/css/bootstrap.css";
import "./TableList.css";

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
      <div className="row">
        <div className="col-md-6">
          <h1 className="p-3 mb-2  text-white">Choose a test:</h1>
          <div className="scrollbar">
            {tableNames.map((tableName) => (
              <div key={tableName}>
                <Link to={`/quiz/${tableName}`}>
                  <p className="btn btn-primary">
                    {replaceCharacter(
                      removeFirstCharacter(removePart(tableName, username)),
                    )}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <Link to="/crud-question">
            <button className="btn btn-danger">Edit</button>
          </Link>
        </div>

        <div className="col-md-6 bg-muted">
          <p className="text-white">
            On the left side, you will find all your tests!
            <br />
            <br />
            Click on the test name to start the challenge!
            <br />
            If you want to create a new test or edit an existing one, click on
            the edit option.
          </p>
        </div>
      </div>
    </div>
  );
};
