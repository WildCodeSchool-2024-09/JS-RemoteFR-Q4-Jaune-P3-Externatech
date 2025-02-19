import axios from "axios";
import { useLoaderData } from "react-router-dom";
import NewOfferForm from "./NewOfferForm";
import "./company-dashboard.css";
function CompanyDasboard() {
  const companyData = useLoaderData() as CompanyData;
  const newOffer = {
    title: "",
    description: "",
    date: "",
    salary: 0,
    requirements: "",
    company_id: 0,
    contract_id: 0,
  };
  console.info(companyData);
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
          <button type="button">AFFICHER TOUT</button>
          <button type="button">AJOUTER UNE OFFRE</button>
        </div>
        <h2>Mes CANDIDATS</h2>
        <p>cards candidats</p>

        <button type="button">AFFICHER TOUT</button>
        <h2>Mes INFORMATIONS</h2>
        <p>{companyData.description}</p>
        <button type="button">MODIFIER</button>

        <h2>Creer une offre</h2>
        <NewOfferForm
          defaultValue={newOffer}
          onSubmit={(offerData) => {
            axios
              .post(`${import.meta.env.VITE_API_URL}/api/offers`, offerData)
              .catch((error) => {
                console.error("Erreur lors de l'ajout de l'offre :", error);
              });
          }}
        >
          Ajouter
        </NewOfferForm>
      </section>
    </div>
  );
}

export default CompanyDasboard;
