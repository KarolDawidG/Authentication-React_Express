import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ShowTables.css';
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";

export const ShowTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleDeleteUser = async (tableName:any) => {
    try {
      await axios.delete(`http://localhost:3001/create-table/${tableName}`);
      navigate(0);
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
  
    const removeChars = (inputString:string, charsToRemove:string) => {
      const regexName = new RegExp(`[${charsToRemove}]`, 'g');
      const resultRegexName = inputString.replace(regexName, '');

        const regex_ = new RegExp(`[_]`, 'g');
        const finalRresult = resultRegexName.replace(regex_, ' ');

        return finalRresult;
    };
    
  return (
    <>
    <p className="crud-deiscription"> Lista dostepnych tabel: </p>
    <ul>
        {tableNames.map((tableName) => (
          <li className="table-name" key={tableName}>{removeChars(tableName, username)}
            <button>Update</button>
            <button onClick={() => handleDeleteUser(tableName)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
