import axios from "axios";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import OfferForm from "./OfferForm";
import "./company-dashboard.css";
import CandidateCard from "../../components/Candidate-card/CandidateCard";
import OfferCard from "../../components/Offer-card/OfferCard";

function CompanyDashboard() {
  const [errorMessage, setErrorMessage] = useState("");

  const { company, offers, candidatesByCompany } = useLoaderData() as {
    company: CompanyData;
    offers: OfferData[];
    candidatesByCompany: CandidateOfferData[];
  };
  const activeOffers =
    offers.length <= 1
      ? `${offers.length} offre active`
      : `${offers.length} offres actives`;

  const activeCandidates =
    candidatesByCompany.length <= 1
      ? `${candidatesByCompany.length} candidature`
      : `${candidatesByCompany.length} candidatures`;

  const newOffer = {
    title: "",
    city: "",
    background: "",
    description: "",
    salary: 0,
    profile: "",
    work_condition_id: 0,
    contract_id: 0,
  };

  const handleOfferSubmit = async (newOffer: OfferDataForm) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/offers`, newOffer, {
        withCredentials: true,
      });
      setErrorMessage("");
      console.info("Offre ajoutée avec succès !");
      toast.success("Offre ajoutée avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de l'ajout de l'offre :", error);
        setErrorMessage(error.response?.data.error);
        toast.error("Erreur lors de l'ajout de l'offre !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Une erreur inattendue s'est produite :", error);
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
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
              <li>{activeCandidates}</li>
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
        <ul className="scroll-card-container">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <li key={offer.id}>
                {" "}
                <OfferCard offer={offer} />
              </li>
            ))
          ) : (
            <li>Pas d'offre active</li>
          )}
        </ul>
        <div className="actions">
          <Link className="light-box" to="/">
            AJOUTER UNE OFFRE
          </Link>
        </div>
        <h2>Mes CANDIDATS</h2>
        <ul className="scroll-card-container">
          {candidatesByCompany.length > 0 ? (
            candidatesByCompany.map((candidateOffer) => (
              <li key={candidateOffer.id}>
                <CandidateCard candidateOffer={candidateOffer} />
              </li>
            ))
          ) : (
            <li>Pas de candidature en cours</li>
          )}
        </ul>

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
      <OfferForm
        value={newOffer}
        errorMessage={errorMessage}
        onSubmit={handleOfferSubmit}
      >
        AJOUTER UNE OFFRE
      </OfferForm>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />{" "}
    </main>
  );
}

export default CompanyDashboard;
