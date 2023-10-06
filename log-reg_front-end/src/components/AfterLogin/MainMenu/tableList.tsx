import { useEffect, useState } from "react";
import axios from "axios";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../CRUD-question/ShowTables/utils/stringHelpers";
import { Quiz } from "../Quiz/Quiz";

export const TableList = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTableName, setSelectedTableName] = useState();

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

  const renderQuiz = (tableName: any) => {
    setSelectedTableName(tableName);
    setShowQuiz(true);
  };

  return (
    <>
      
        {showQuiz ? (
          <Quiz table={selectedTableName} onClose={() => setShowQuiz(false)} />
        ) : (
          <ul>
            {tableNames.map((tableName) => (
              <li key={tableName}>
                <button onClick={() => renderQuiz(tableName)}>
                  {replaceCharacter(
                    removeFirstCharacter(removePart(tableName, username)),
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      
    </>
  );
};
