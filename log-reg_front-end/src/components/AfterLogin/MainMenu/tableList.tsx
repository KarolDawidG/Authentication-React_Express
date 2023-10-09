import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  ToastContainer,
} from "react-bootstrap";
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../CRUD-question/ShowTables/utils/stringHelpers";

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
        handleNetworkError(error);
      });
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", textAlign: "center", margin: "20px auto", maxWidth: "600px" }}>
      <h1>Wybierz test:</h1>
      <Row>
        <Col>
          <ListGroup>
            {tableNames.map((tableName) => (
              <ListGroup.Item
                key={tableName}
                style={{ margin: "10px 0", padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px", transition: "background-color 0.3s ease-in-out" }}
              >
                <Link to={`/quiz/${tableName}`}>
                <Button variant="primary" style={{ width: "100%" }}>
                    {replaceCharacter(
                      removeFirstCharacter(removePart(tableName, username))
                    )}
                </Button>

                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
