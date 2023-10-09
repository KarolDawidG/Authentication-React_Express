import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowTables.css";
import { handleNetworkError } from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "./utils/stringHelpers";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import { Table, Button, Row, Col } from "react-bootstrap"; // Importujemy komponenty Bootstrapa

export const ShowTables = () => {
  const [tableNames, setTableNames] = useState([]);
  const [username, setUsername] = useState("");

  const handleDelete = async (tableName: any) => {
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

  return (
    <>
      <p style={{ color: "white" }}> Lista dostępnych tabel: </p>
      <div className="table-container">
        <div className="table-wrapper">
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Nazwa tabeli</th>
                <th style={{ width: "50%" }}>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {tableNames.map((tableName) => (
                <tr key={tableName}>
                  <td>
                    {replaceCharacter(
                      removeFirstCharacter(removePart(tableName, username))
                    )}
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <RedirectBtn to={`/insert/${username}/${tableName}`}>
                          Create
                        </RedirectBtn>
                        </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(tableName)}
                          className="btn-show"
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
