import { useState } from "react";
import "./navBar.css";

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
      <img
        src="./public/logo-app.png"
        alt="Logo de l'application Externatech"
        className="LogoApp"
      />
      <div className="burgerContainer">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="burgerButton"
        >
          {isOpen ? burgerClose() : burgerOpen()}
        </button>
        {isOpen && (
          <div className="menuDroper">
            <ul>
              <li>Les entreprises</li>
              <li>Les offres</li>
              <li>Espace entreprise</li>
              <li>Se connecter</li>
            </ul>
          </div>
        )}
      </div>
      <div className="menuDesktop">
        <ul>
          <li>Les entreprises</li>
          <li>Les offres</li>
          <li>Espace entreprise</li>
          <li>Se connecter</li>
        </ul>
      </div>
    </nav>
  );
}
