import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import {
  backgroundColor,
  preventSpace,
  validatePassword,
} from "../../Utils/FormsUtils/forms-utils";
import { LoginContext } from "./Login";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const context = useContext(LoginContext);
  if (!context) return null;
  const {
    handleSubmit,
    username,
    password,
    setPassword,
    setUsername,
    onClose,
  } = context;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Login:</Form.Label>
        <Form.Control
          minLength={4}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            backgroundColor: `${backgroundColor(username.length, 4)}`,
          }}
          onKeyDown={preventSpace}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Hasło:</Form.Label>
        <Form.Control
          minLength={8}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: validatePassword(password) ? "lightgreen" : "grey",
          }}
          onKeyDown={preventSpace}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Zaloguj się!
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Zamknij
      </Button>
      <Link to="/reset-email" className="btn btn-link">
        Przypomnij hasło
      </Link>
    </Form>
  );
};
