import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface InsertHeaderProps {
  nazwaTabeli?: string;
}

const headerStyles = {
  insertContainer: {
    display: "flex",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#333", // Nowy kolor tła
    color: "#fff", // Nowy kolor tekstu
  },
  username: {
    margin: "0",
    padding: "5px",
    fontWeight: "bold",
  },
  tablename: {
    margin: "0",
    padding: "5px",
  },
};


export const Header: React.FC<InsertHeaderProps> = ({ nazwaTabeli }) => {
  const user = localStorage.getItem("user");

  return (
    <Container fluid style={headerStyles.insertContainer}>
      <Row>
        <Col>
          <p style={headerStyles.username}>Zalogowany użytkownik: {user}</p>
        </Col>
        {nazwaTabeli && (
          <Col>
            <p style={headerStyles.tablename}>Nazwa tabeli: {nazwaTabeli}</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
