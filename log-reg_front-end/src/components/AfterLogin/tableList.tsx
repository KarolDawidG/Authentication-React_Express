import {  useEffect, useState, createContext } from "react";
import axios from "axios";
import { removeFirstCharacter, removePart, replaceCharacter} from "./CRUD-question/ShowTables/utils/stringHelpers";

interface TableContextType{
    username?: string | undefined,
    tableNames?: string[],
}

export const TableListContext = createContext<TableContextType | null>(null);

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
            console.error(error);
          });
      }, []);
return(
    <>
        <TableListContext.Provider value={{
            username,
            tableNames
        }}>
            <ul>
                {tableNames.map((tableName) => (
                <li  key={tableName}>
                    {replaceCharacter(
                    removeFirstCharacter(removePart(tableName, username)),
                    )}

                </li>
                ))}
            </ul>
        </TableListContext.Provider>

    </>
)
}