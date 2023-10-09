import React, { useState } from "react";
import axios from "axios";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import { Form, Button, InputGroup } from "react-bootstrap";

export const CreateTable = () => {
  const [inputvalue, setInputvalue] = useState<string>("");
  const username = localStorage.getItem("user");

  const handleFormSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:3001/create-table/${username}/${inputvalue}`
      );
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  const replaceSpacesWithUnderscores = (e: string) => {
    return e.replace(/[^\w]/gi, "_");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          value={replaceSpacesWithUnderscores(inputvalue)}
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder="Wpisz nazwę nowej tabeli"
        />
        <InputGroup>
          <Button type="submit" variant="primary">
            Stworz
          </Button>
        </InputGroup>
      </InputGroup>
    </Form>
  );
};
