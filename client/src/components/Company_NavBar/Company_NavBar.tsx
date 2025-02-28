import { useState } from "react";
import "./Company_Navbar.css";
import { Link, useParams } from "react-router-dom";

export default function Company_NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

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
            <Link to={`/companies/dashboard/${id}`} className="dashboard_link">
              <b>Dashboard</b>
            </Link>
            <Link to="#">
              <b>Mes offres</b>
            </Link>
            <Link to="#">
              <b>Mes candidats</b>
            </Link>
            <Link to="#">
              <b>Se connecter</b>
            </Link>
          </ul>
        )}
      </div>

      <ul className="menu_Desktop">
        <Link to={`/companies/dashboard/${id}`}>
          <b>Dashboard</b>
        </Link>
        <Link to="#">
          <b>Mes offres</b>
        </Link>
        <Link to="#">
          <b>Mes candidats</b>
        </Link>
        <Link to="#">
          <b>Se connecter</b>
        </Link>
      </ul>
    </nav>
  );
}
