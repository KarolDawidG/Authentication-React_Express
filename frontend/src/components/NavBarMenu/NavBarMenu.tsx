import { useState } from "react";
import { Button, Navbar, Nav, Modal } from "react-bootstrap";
import { Registration } from "../Authentication/Register/Registration";
import { Login } from "../Authentication/Login/Login";

export const NavBarMenu = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegisFormVisible, setIsRegisFormVisible] = useState(false);

  const showLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const showRegisForm = () => {
    setIsRegisFormVisible(!isRegisFormVisible);
  };

  const handleCloseModal = () => {
    setIsLoginFormVisible(false);
    setIsRegisFormVisible(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Mega-Test</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item className="ml-auto">
            <Button onClick={showLoginForm} variant="outline-primary">
              Log-in
            </Button>
          </Nav.Item>
          <Nav.Item className="ml-auto">
            <Button onClick={showRegisForm} variant="outline-success">
              Reg-in
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

      <Modal
        show={isLoginFormVisible || isRegisFormVisible}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isLoginFormVisible ? "Sign-in" : "Sign-up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoginFormVisible && <Login onClose={handleCloseModal} />}
          {isRegisFormVisible && <Registration onClose={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};
