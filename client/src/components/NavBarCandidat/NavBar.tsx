import { useState } from "react";
import "./navBar.css";

export default function NavbarCandidat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <img
        src="./public/logo-app.png"
        alt="Logo de l'application Externatech"
        className="LogoApp"
      />
      <div className="burgerCandidat">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="burgerButton"
        >
          {isOpen ? "✖" : "☰"}
        </button>
        {isOpen && (
          <div className="menuDroper">
            <ul>
              <li>Accueil</li>
              <li>À propos</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
