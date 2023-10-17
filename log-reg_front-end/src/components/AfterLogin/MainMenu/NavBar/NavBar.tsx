import { useState } from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import { LogoutButton } from "../../../Others/LogoutButton";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import { Contack } from "./Contact";

export const NavBar = () => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);

  const showContactForm = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  const handleCloseModal = () => {
    setIsContactFormVisible(false);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Mega-Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <RedirectBtn to="https://github.com/KarolDawidG">
                About
              </RedirectBtn>
              <LogoutButton />
            </Nav.Item>

            <Nav.Item>
              <Button
                onClick={showContactForm}
                variant="outline-primary"
                className="btn-lg"
              >
                Kontakt
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <Modal show={isContactFormVisible} onHide={handleCloseModal}>
            <Contack onClose={handleCloseModal} />  
            {/* //todo some issue */}
        </Modal>
      </Navbar>
    </>
  );
};
