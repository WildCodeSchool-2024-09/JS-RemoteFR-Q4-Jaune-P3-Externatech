import { useState } from "react";
import "./navBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import Login from "./Login";

export default function NavBar() {
  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  const disconnect = () => {
    setRole("anonymous");
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
  const [activeLink, setActiveLink] = useState(String);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          onClick={toggleMenu}
          className={`burgerButton ${isOpen ? "menuOpen" : ""}`}
        >
          {isOpen ? (
            <span className="close">✖</span>
          ) : (
            <span className="open">☰</span>
          )}
        </button>

        <ul className={`menuDroper ${isOpen ? "open" : ""}`}>
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={activeLink === link.name ? "active" : ""}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}

          {role !== "anonymous" ? (
            <button
              type="button"
              className={activeLink === "disconnect" ? "active" : ""}
              onClick={() => {
                setActiveLink("disconnect");
                disconnect();
                setIsOpen(false);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                type="button"
                className={activeLink === "espace-entreprise" ? "active" : ""}
                onClick={() => {
                  setActiveLink("espace-entreprise");
                  openModal();
                  setIsOpen(false);
                }}
              >
                Espace entreprise
              </button>
              <button
                type="button"
                className={activeLink === "se-connecter" ? "active" : ""}
                onClick={() => {
                  setActiveLink("se-connecter");
                  openModal();
                  setIsOpen(false);
                }}
              >
                Se connecter
              </button>
            </>
          )}
        </ul>
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
          <button type="button" onClick={disconnect}>
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
