import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import { Header } from "../InsertInTable/Headers/Header";
import { TableListContext } from "../../tableList";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const [user, setUsername] = useState<string>("");

  const context = useContext(TableListContext);

  useEffect(() => {
    const username = localStorage.getItem("user");

    setUsername(username || "");
  }, [context]);

  const handleFormSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:3001/create-table/${user}/${inputvalue}`,
      );
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const replaceSpacesWithUnderscores = (e: string) => {
    return e.replace(/[^\w]/gi, "_");
  };

  return (
    <>
      <TableListContext.Provider value={{ username: user }}>
        <Header />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={replaceSpacesWithUnderscores(inputvalue)}
            onChange={(e) => setInputvalue(e.target.value)}
            placeholder="Wpisz nazwe nowej tabeli"
          />
          <button type="submit">Stworz</button>
        </form>
      </TableListContext.Provider>
    </>
  );
};
