import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import OfferForm from "./OfferForm";
import "./company-dashboard.css";
import OfferCard from "../../components/OfferCard";

function CompanyDashboard() {
  const { company, offers } = useLoaderData() as {
    company: CompanyData;
    offers: Offers[];
  };
  console.info(offers);
  const activeOffers =
    offers.length <= 1
      ? `${offers.length} offre active`
      : `${offers.length} offres actives`;

  const newOffer = {
    title: "",
    city: "",
    logo: "",
    background: "/public/background-default.jpg",
    description: "",
    salary: 0,
    profile: "",
    remote: "",
    company_id: company.id,
    contract_id: 0,
  };

  const handleOfferSubmit = (offerData: typeof newOffer) => {
    console.info("Nouvelle offre :", offerData);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/offers`, offerData)
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'offre :", error);
      });
  };

  console.info(offers);

  return (
    <main className="company-dashboard">
      <h1>Bienvenue {company.name}</h1>
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
        <div className="card-container">
          {offers.map((offer) => (
            <OfferCard key={Number(offer.id)} offer={offer} />
          ))}
        </div>
        <div className="actions">
          <Link className="colored-box" to="/">
            AFFICHER TOUT
          </Link>
          <Link className="light-box" to="/">
            AJOUTER UNE OFFRE
          </Link>
        </div>
        <h2>Mes CANDIDATS</h2>
        <p>cards candidats</p>

        <Link className="colored-box" to="/">
          AFFICHER TOUT
        </Link>
        <h2>Mes INFORMATIONS</h2>
        <p>{company.description}</p>
        <Link className="light-box" to="/">
          MODIFIER
        </Link>
      </section>
      <h2>Créer une OFFRE</h2>
      <OfferForm value={newOffer} onSubmit={handleOfferSubmit}>
        Ajouter une offre
      </OfferForm>
    </main>
  );
}

export default CompanyDashboard;
