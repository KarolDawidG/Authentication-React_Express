import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import { Header } from "../InsertInTable/Headers/Header";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("user");
    
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleFormSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/create-table/${username}/${inputvalue}`);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const replaceSpacesWithUnderscores = (e: string) => {
    return e.replace(/[^\w]/gi, "_");
  };

  return (
    <>
      <Header username={username}/>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={replaceSpacesWithUnderscores(inputvalue)}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="Wpisz nazwe nowej tabeli"
        />
        <button type="submit">Stworz</button>
      </form>
    </>
  );
};
