import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleNetworkError } from "../../../Utils/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../../CRUD-question/MenuCrud/ShowTables/utils/stringHelpers";
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
        <div className="col-md-6 text-center text-md-start p-1">
          <h1 className="p-1 mb-1  text-white">Choose a test:</h1>
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
        </div>

        <div className="col-md-6 text-center text-md-start p-1">
          <p className="text-white">
            On the left side, you will find all your tests!
            <br />
            Click on the test name to start the challenge!
            <br />
            If you want to create a new test or edit an existing one, click on
            the edit option.
          </p>
          <Link to="/crud-question">
            <button className="btn btn-danger">Edit your test</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
