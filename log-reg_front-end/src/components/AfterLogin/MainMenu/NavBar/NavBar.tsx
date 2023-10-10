import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "../../../Others/LogoutButton";

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sg">
      <Navbar.Brand href="#home">Mega-Test</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="https://github.com/KarolDawidG">About</Nav.Link>
          <Nav.Link href="https://react-g-rock-paper-scissors.netlify.app/contact">Contact</Nav.Link>
          <Nav.Item>
            <LogoutButton />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
