import { Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "../../../Others/LogoutButton";
import { RedirectBtn } from "../../../Others/RedirectBtn";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Mega-Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <RedirectBtn to="https://github.com/KarolDawidG">About</RedirectBtn>
              <RedirectBtn to="https://react-g-rock-paper-scissors.netlify.app/contact">Contack!</RedirectBtn>
              <LogoutButton />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

