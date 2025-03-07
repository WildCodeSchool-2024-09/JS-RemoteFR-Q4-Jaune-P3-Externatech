import { useState } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import LoginCompany from "./LoginCompany";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const burgerClose = () => {
    return <p className="close">✖</p>;
  };

  const burgerOpen = () => {
    return <p className="open">☰</p>;
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <nav>
      <Link to="/" className="logo_title">
        <img
          src="/public/logo-app.png"
          alt="Logo de l'application Externatech"
          className="LogoApp"
        />
      </Link>
      <div className="burgerContainer">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="burgerButton"
        >
          {isOpen ? burgerClose() : burgerOpen()}
        </button>
        {isOpen && (
          <ul className="menuDroper">
            <Link to="#">Les entreprises</Link>
            <Link to="/offers">Les offres</Link>
            <button type="button" onClick={openModal}>
              Espace entreprise
            </button>{" "}
            <Link to="#">Se connecter</Link>
          </ul>
        )}
      </div>

      <ul className="menuDesktop">
        <Link to="#">Les entreprises</Link>

        <Link to="/offers">Les offres</Link>
        <button type="button" onClick={openModal}>
          Espace entreprise
        </button>

        <Link to="#">Se connecter</Link>
      </ul>
      <LoginCompany isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
