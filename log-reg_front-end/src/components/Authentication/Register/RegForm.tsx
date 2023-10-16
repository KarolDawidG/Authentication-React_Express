import React, { useContext } from "react";
import {
  backgroundColor,
  preventSpace,
  validateEmail,
  validatePassword,
} from "../../Utils/FormsUtils/forms-utils";
import { RegisterContect, CaptchaContext } from "./Registration";
import { REACT_APP_SITE_KEY } from "../../Utils/links";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Button } from "react-bootstrap";

export const RegForm: React.FC = () => {
  const context = useContext(RegisterContect);
  const contextCapta = useContext(CaptchaContext);

  if (!context || !contextCapta) return null;
  const {
    handleSubmit,
    username,
    password,
    setPassword,
    setUsername,
    email,
    setEmail,
    onClose,
  } = context;
  const captchaRef = contextCapta as React.MutableRefObject<ReCAPTCHA | null>;

  const removeSpecialCharacters = (inputString: string) => {
    return inputString.replace(/[^\w\s]/gi, "");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          minLength={4}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: validateEmail(email) ? "lightgreen" : "grey",
          }}
          onKeyDown={preventSpace}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Login:</Form.Label>
        <Form.Control
          type="text"
          minLength={6}
          maxLength={16}
          id="username"
          value={removeSpecialCharacters(username)}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            backgroundColor: `${backgroundColor(username.length, 6)}`,
          }}
          onKeyDown={preventSpace}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          maxLength={16}
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

      <ReCAPTCHA sitekey={REACT_APP_SITE_KEY} ref={captchaRef} />

      <Button variant="primary" type="submit">
        Sign up!
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Form>
  );
};
