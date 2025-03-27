import "./footer.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../navbar/Login";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  return (
    <footer>
      <img src="/Logo-app.png" alt="logo" />
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <button type="button" onClick={openModal}>
              Espace entreprise
            </button>
          </li>
          <li>
            <Link to="/">Nous contacter</Link>
          </li>
        </ul>
        <div />
        <ul>
          <li>
            <Link to="/GeneralConditions">Conditions générales</Link>
          </li>
          <li>
            <Link to="/LegalInformations">Mentions légales</Link>
          </li>
          <li>
            <Link to="/">Besoin d'aide ?</Link>
          </li>
        </ul>
      </div>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </footer>
  );
}
