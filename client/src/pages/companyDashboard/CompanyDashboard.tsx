import axios from "axios";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";

import { Bounce, ToastContainer, toast } from "react-toastify";
import OfferForm from "./OfferForm";
import "./company-dashboard.css";
import CandidateCard from "../../components/Candidate-card/CandidateCard";
import OfferCard from "../../components/Offer-card/OfferCard";

function CompanyDashboard() {
  const { company, offers, candidatesByCompany, stacks } = useLoaderData() as {
    company: CompanyData;
    stacks: StackData[];
    offers: OfferData[];
    candidatesByCompany: CandidateOfferData[];
  };

  const validator = useRevalidator();

  /***************DYNAMICS DATAS ********************** */
  const activeOffers = offers.length;

  const activeCandidates = candidatesByCompany.length;

  let countAcceptedApplies = 0;
  for (const apply of candidatesByCompany) {
    if (apply.status === "acceptée") {
      countAcceptedApplies += 1;
    }
  }

  const date = new Date(company.updated_at);
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(date)
    .replace(",", " à");

  /*****************ADD OFFERS ************************ */
  const [errorMessage, setErrorMessage] = useState("");

  const newOffer = {
    title: "",
    city: "",
    background: "",
    description: "",
    salary: 0,
    profile: "",
    work_condition_id: 0,
    contract_id: 0,
    stacks: [],
  };

  const handleOfferSubmit = async (newOffer: OfferDataForm) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/offers`, newOffer, {
        withCredentials: true,
      });
      setErrorMessage("");
      console.info("Offre ajoutée avec succès !");
      validator.revalidate();
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
  /***************************************************************** */
  return (
    <>
      <h1 className="title-company-dashboard">
        Bienvenue {company.name}
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/logo/${company.logo}`}
          alt={`logo de ${company.name}`}
        />
      </h1>

      <main className="company-dashboard">
        <h2>
          Le <strong> RÉCAPUTILATIF</strong>
        </h2>
        <div className="gradientBar" />
        <section className="general-view">
          <div className="top">
            <article>
              <h3>
                <a href="#my-offers">Offre(s)</a>
              </h3>
              <ul className="square-list">
                <li>{activeOffers}</li>
              </ul>
            </article>
            <article>
              <h3>
                <a href="#my-candidates">Candidature(s)</a>
              </h3>
              <ul className="square-list">
                <li>{activeCandidates}</li>
              </ul>
            </article>
            <article>
              <h3>
                <a href="#my-candidates"> Candidature(s) acceptée(s)</a>
              </h3>
              <ul className="square-list">
                <li>{countAcceptedApplies} </li>
              </ul>
            </article>
          </div>
          <Link
            className="light-box-link"
            to="/companies/dashboard/information"
          >
            <div className="info-resume">
              <h3>Mes infos</h3>
              <ul className="square-list">
                <li>dernière actualisation le {formattedDate}</li>
              </ul>
            </div>
          </Link>
        </section>
        <section className="display">
          <h2>
            Mes <strong> OFFRES</strong>
          </h2>
          <div className="gradientBar" />

          <ul className="scroll-card-container">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <li key={offer.id}>
                  {" "}
                  <OfferCard offer={offer} editable={true} />
                  <Link
                    className="colored-box link-to-applies"
                    to={`/companies/dashboard/candidates-offers/${offer.id}`}
                  >
                    voir les candidatures
                  </Link>
                </li>
              ))
            ) : (
              <li>Pas d'offre active</li>
            )}
          </ul>

          <h2>
            Mes <strong>CANDIDATS</strong>
          </h2>
          <div className="gradientBar" />

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

          <h2>
            Ma <strong>DESCRIPTION</strong>
          </h2>
          <div className="gradientBar" />

          <p>{company.description}</p>
          <div className="actions">
            <Link className="colored-box" to="/">
              MODIFIER
            </Link>
            <Link className="light-box" to="/companies/dashboard/information">
              VOIR TOUTES MES INFOS
            </Link>
          </div>
        </section>
        <h2>
          Créer une <strong>OFFRE</strong>
        </h2>
        <div className="gradientBar" />
        <OfferForm
          value={newOffer}
          stacks={stacks}
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
    </>
  );
}

export default CompanyDashboard;
