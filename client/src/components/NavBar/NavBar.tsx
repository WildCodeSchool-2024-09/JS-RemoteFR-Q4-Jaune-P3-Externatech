import { useState } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const burgerClose = () => {
    return <p className="close">✖</p>;
  };

  const burgerOpen = () => {
    return <p className="open">☰</p>;
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
            <Link to="#">Les offres</Link>
            <Link to="#">Espace entreprise</Link>
            <Link to="#">Se connecter</Link>
          </ul>
        )}
      </div>

      <ul className="menuDesktop">
        <Link to="#">Les entreprises</Link>
        <Link to="#">Les offres</Link>
        <Link to="#">Espace entreprise</Link>
        <Link to="#">Se connecter</Link>
      </ul>
    </nav>
  );
}
