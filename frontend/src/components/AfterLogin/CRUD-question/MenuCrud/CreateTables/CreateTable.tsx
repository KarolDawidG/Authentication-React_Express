import { useState } from "react";
import axios from "axios";
import { handleNetworkError } from "../../../../Utils/handlers/networkErrorFunctions";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { CREATE_TABLE } from "../../../../Utils/links";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const username = localStorage.getItem("user");

  const handleFormSubmit = async () => {
    try {
      await axios.post(
        `${CREATE_TABLE}/${username}/${inputvalue}`,
      );
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const replaceSpacesWithUnderscores = (e: string) => {
    return e.replace(/[^\w]/gi, "_");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <>
        <input
          className="m-1 p-1 mt-1"
          type="text"
          value={replaceSpacesWithUnderscores(inputvalue)}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="Enter new table name"
        />
        <button type="submit" className="btn btn-primary m-1 btn-sm">
          Create
        </button>
      
        <Link to="/after-login">
            <button className="btn btn-secondary m-1 btn-sm">Back</button>
        </Link>
      </>
    </form>
  );
};
