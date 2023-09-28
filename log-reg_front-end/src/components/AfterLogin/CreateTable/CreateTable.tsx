import React, { SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const savedUsername = localStorage.getItem("user");
      if (savedUsername) {
          setUsername(savedUsername);
        }
   
    }, []);
    
  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
      axios.post(`http://localhost:3001/create-table/${username}/${inputvalue}`)
        .then(res => {
          console.log(res.data);
          navigate(0);
        })
        .catch(error => {
          console.error(error);
        });
  };
  
  const replaceSpacesWithUnderscores = (e:string) => {
    return e.replace(/[^\w]/gi, '_');
  }
  
  return (
    <>
    <p className="crud-deiscription"> Zalogowany użytkownik: {username}</p>
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
