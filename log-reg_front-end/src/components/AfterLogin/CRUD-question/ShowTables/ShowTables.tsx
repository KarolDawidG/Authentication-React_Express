import React, { useState, useEffect } from "react";
import axios from "axios";
import './ShowTables.css';
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";

export const ShowTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");

  const handleDeleteUser = async (tableName:any) => {
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
        axios.get(`http://localhost:3001/create-table/${savedUsername}`)
        .then((response) => {
          const { data } = response;
          const tableNamesArray = data.tablesUser; 
          setTableNames(tableNamesArray); 
          
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    // const removeChars = (inputString:string, charsToRemove:string) => {
    //   const regex = new RegExp(`[${charsToRemove}]`, 'g');
    //   const result = inputString.replace(regex, '');

    //     return result;
    // };

    // const changeToSpace = (inputString:string) => {
    //     const regex = new RegExp(`[_]`, 'g');
    //     const result = inputString.replace(regex, ' ');

    //     return result;
    // };
    



  return (
    <>
    <p className="show_tables__p"> Lista dostepnych tabel: </p>
    <ul>
        {tableNames.map((tableName) => (
          
          <li className="table-name" key={tableName}>{tableName}
            <button>Update</button>
            <button onClick={() => handleDeleteUser(tableName)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
