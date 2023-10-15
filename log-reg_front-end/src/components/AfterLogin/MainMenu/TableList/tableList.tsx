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
          <h1 className="p-3 mb-2  text-white">Wybierz test:</h1>
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
            <button className="btn btn-danger">Edytuj</button>
          </Link>
        </div>

        <div className="col-md-6 bg-muted">
          <p className="text-secondary">
            Po lewej stronie znajdują się wszystkie twoje testy!
          </p>
          <p className="text-secondary">
            Kliknij <span className="btn btn-primary">Nazwa_testu!</span> aby
            przejść do wybranego testu!
          </p>

          <p className="text-secondary">
            Jeśli chcesz stworzyć nowy test, bądź edytować już istniejący,
            kliknij opcję edytuj.
          </p>
        </div>
      </div>
    </div>
  );
};
