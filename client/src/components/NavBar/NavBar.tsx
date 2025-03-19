import axios from "axios";
import { useState } from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import Login from "./Login";

export default function NavBar() {
  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  const logout = () => {
    axios
      .get("http://localhost:3310/api/logout", { withCredentials: true })
      .then(() => setRole("anonymous"))
      .catch((error) => console.error(error));
    navigate("/");
  };

  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "company", "candidate"],
    },
    {
      name: "Les entreprises",
      path: "/companies",
      role: ["anonymous", "company", "candidate"],
    },
    {
      name: "Les offres",
      path: "/offers",
      role: ["anonymous", "company", "candidate"],
    },
    {
      name: "Mon dashboard",
      path: "/companies/dashboard",
      role: ["company"],
    },
    {
      name: "Mes infos",
      path: "/companies/dashboard/information",
      role: ["company"],
    },
    {
      name: "Mon dashboard",
      path: "/candidates/dashboard",
      role: ["candidate"],
    },
    {
      name: "Mes offres enregistrées",
      path: "/candidates/registered-offers",
      role: ["candidate"],
    },
  ];

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
            {links
              .filter((link) => link.role.includes(role))
              .map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}

            {role !== "anonymous" ? (
              <button type="button" onClick={logout}>
                Se déconnecter
              </button>
            ) : (
              <>
                <button type="button" onClick={openModal}>
                  Espace entreprise
                </button>
                <button type="button" onClick={openModal}>
                  Se connecter
                </button>
              </>
            )}
          </ul>
        )}
      </div>

      <ul className="menuDesktop">
        {links
          .filter((link) => link.role.includes(role))
          .map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}

        {role !== "anonymous" ? (
          <button type="button" onClick={logout}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button type="button" onClick={openModal}>
              Espace entreprise
            </button>
            <button type="button" onClick={openModal}>
              Se connecter
            </button>
          </>
        )}
      </ul>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
