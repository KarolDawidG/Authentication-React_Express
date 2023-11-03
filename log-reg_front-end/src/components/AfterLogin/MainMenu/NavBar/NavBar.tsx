import { useState } from "react";
import { LogoutButton } from "../../../Others/LogoutButton";
import { RedirectBtn } from "../../../Others/RedirectBtn";
import { Contact } from "./Contact";
import "bootstrap/dist/css/bootstrap.css";
import "./NavBar.css";

export const NavBar = () => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showContactForm = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  const handleCloseModal = () => {
    setIsContactFormVisible(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-sm">
          <a href="#home" className="navbar-brand">
            Mega-Test
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <RedirectBtn to="https://github.com/KarolDawidG">About</RedirectBtn>
              </li>
              <li className="nav-item">
                <LogoutButton />
              </li>
              <li className="nav-item">
                <button
                  onClick={showContactForm}
                  className="btn btn-outline-secondary btn-lg"
                >
                  Contact!
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isContactFormVisible && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-body">
            <Contact onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};
