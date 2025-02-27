import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import NewOfferForm from "./NewOfferForm";
import "./company-dashboard.css";
function CompanyDashboard() {
  const companyData = useLoaderData() as CompanyData;
  const newOffer = {
    title: "",
    city: "",
    logo: "",
    background: "",
    description: "",
    date: "",
    salary: 0,
    skills: "",
    requirements: "",
    remote: "",
    company_id: companyData.id,
    contract_id: 0,
  };

  console.info(typeof newOffer.company_id);
  const handleOfferSubmit = (offerData: typeof newOffer) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/offers`, offerData)
      .then((response) => {
        console.info("Offre ajoutée avec succès :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'offre :", error);
      });
  };
  return (
    <div className="company-dashboard">
      <h1>Bienvenue {companyData.name}</h1>
      <section className="general-view">
        <div className="top">
          <div className="box">
            <h3>Mes offres</h3>
            <ul>
              <li>7 offres actives</li>
              <li>12 offres archivées</li>
            </ul>
          </div>
          <div className="box">
            <h3>Mes candidats</h3>
            <ul>
              <li>11 candidatures à examiner</li>
              <li>6 candidatures acceptées</li>
            </ul>
          </div>
        </div>
        <div className="box">
          <h3>Mes infos</h3>
          <ul>
            <li>dernière actualisation le 12/02/2025</li>
          </ul>
        </div>
      </section>
      <section className="display">
        <h2>Mes OFFRES</h2>
        <p>card offres</p>
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
        <p>{companyData.description}</p>
        <Link className="light-box" to="/">
          MODIFIER
        </Link>

        <h2>Creer une offre</h2>
        <NewOfferForm defaultValue={newOffer} onSubmit={handleOfferSubmit}>
          Ajouter une nouvelle offre
        </NewOfferForm>
      </section>
    </div>
  );
}

export default CompanyDashboard;
