import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import OfferForm from "./OfferForm";
import "./company-dashboard.css";
import OfferCard from "../../components/OfferCard";

function CompanyDashboard() {
  const { company, offers } = useLoaderData() as {
    company: CompanyData;
    offers: OfferData[];
  };

  const activeOffers =
    offers.length <= 1
      ? `${offers.length} offre active`
      : `${offers.length} offres actives`;

  const newOffer = {
    title: "",
    city: "",
    background: "",
    description: "",
    salary: 0,
    profile: "",
    remote_id: 0,
    contract_id: 0,
  };

  const handleOfferSubmit = (newOffer: OfferDataForm) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/offers`, newOffer, {
        withCredentials: true,
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'offre :", error);
      });
  };

  return (
    <main className="company-dashboard">
      <h1>
        Bienvenue {company.name}
        <img src={company.logo} alt={`logo de ${company.name}`} />
      </h1>

      <section className="general-view">
        <div className="top">
          <div className="box">
            <h3>Mes offres</h3>
            <ul className="square-list">
              <li>{activeOffers}</li>
              <li>12 offres archivées</li>
            </ul>
          </div>
          <div className="box">
            <h3>Mes candidats</h3>
            <ul className="square-list">
              <li>11 candidatures à examiner</li>
              <li>6 candidatures acceptées</li>
            </ul>
          </div>
        </div>
        <div className="box">
          <h3>Mes infos</h3>
          <ul className="square-list">
            <li>dernière actualisation le 12/02/2025</li>
          </ul>
        </div>
      </section>
      <section className="display">
        <h2>Mes OFFRES</h2>
        <ul>
          {offers.map((offer) => (
            <li key={offer.id}>
              {" "}
              <OfferCard offer={offer} />
            </li>
          ))}
        </ul>
        <div className="actions">
          <Link className="colored-box" to="/">
            AFFICHER TOUT
          </Link>
          <Link className="light-box" to="/">
            AJOUTER UNE OFFRE
          </Link>
        </div>
        <h2>Mes CANDIDATS</h2>
        <ul>
          <li>cards candidats</li>
        </ul>
        <div className="actions">
          <Link className="colored-box actions" to="/">
            AFFICHER TOUT
          </Link>
        </div>
        <h2>Ma DESCRIPTION</h2>
        <p>{company.description}</p>
        <div className="actions">
          <Link className="colored-box" to="/">
            MODIFIER
          </Link>
          <Link className="light-box" to={`/companies/${company.id}`}>
            VOIR TOUTES MES INFOS
          </Link>
        </div>
      </section>
      <h2>Créer une OFFRE</h2>
      <OfferForm value={newOffer} onSubmit={handleOfferSubmit}>
        AJOUTER UNE OFFRE
      </OfferForm>
    </main>
  );
}

export default CompanyDashboard;
