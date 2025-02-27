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
          <div className="menuDroper">
            <ul>
              <Link
                to={`/companies/dashboard/${id}`}
                className="dashboard_link"
              >
                <b>Dashboard</b>
              </Link>
              <Link to="/companies/CompanyOffers" className="offers_link">
                {" "}
                <b>Mes offres</b>
              </Link>
              <Link to="/companies/CompanyCandidats" className="candidats_link">
                <b>Mes candidats</b>
              </Link>
              <Link to="/companies/CompanyLogin" className="login_link">
                <b>Se connecter</b>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <div className="menuDesktop">
        <ul>
          <Link to={`/companies/dashboard/${id}`}>
            <b>Dashboard</b>
          </Link>
          <Link to="/companies/CompanyOffers">
            <b>Mes offres</b>
          </Link>
          <Link to="/companies/CompanyCandidats">
            <b>Mes candidats</b>
          </Link>
          <Link to="/companies/CompanyLogin">
            <b>Se connecter</b>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
