import { useState } from "react";
import "./companyNavbar.css";
import { Link } from "react-router-dom";

export default function companyNavbar() {
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
          className="Logo_App"
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
          <ul className="menu_Droper">
            <Link to={"/companies/dashboard"} className="dashboard_link">
              Dashboard
            </Link>
            <Link to="#">Mes offres</Link>
            <Link to="#">Mes candidats</Link>
            <Link to="#">Se connecter</Link>
          </ul>
        )}
      </div>

      <ul className="menu_Desktop">
        <Link to={"/companies/dashboard"}>Dashboard</Link>
        <Link to="#">Mes offres</Link>
        <Link to="#">Mes candidats</Link>
        <Link to="#">Se connecter</Link>
      </ul>
    </nav>
  );
}
