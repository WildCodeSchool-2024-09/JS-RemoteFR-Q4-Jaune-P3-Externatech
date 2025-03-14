import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";
import "./candidateDashboard.css";
import { useEffect, useState } from "react";

export default function CandidateDashboard() {
  const offers = useLoaderData() as OfferData[];

  const [isSavedOffersCount, setIsSavedOffersCount] = useState<number>(
    offers.length,
  );

  useEffect(() => {
    setIsSavedOffersCount(offers.length);
  }, [offers]);

  return (
    <>
      <header className="headerCandidat">
        <h1>Bienvenu Françis Lanlane</h1>
      </header>
      <main className="candidatDashboard">
        <section className="general-view">
          <div className="top">
            <div className="box">
              <h3 className="titleBox">
                Mes infos
                <button type="button" className="button">
                  Modifier
                </button>
              </h3>
            </div>
            <div className="box">
              <h3 className="titleBox">Mes offres sauvegardées</h3>
              <ul className="square-list">
                <li className="text">
                  {isSavedOffersCount} Offres sauvegardée
                </li>
              </ul>
            </div>
            <div className="box">
              <h3 className="titleBox">Mes candidatures</h3>
              <ul className="square-list">
                <li className="text">
                  {isSavedOffersCount} candidatures postulées
                </li>
                <li className="text">
                  {isSavedOffersCount} candidatures traitées
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div className="containerTop">
            <h2>Mes offres sauvegardées</h2>
            <span className="offersCount">{isSavedOffersCount}</span>
          </div>
          <div className="gradientBar" />
          {isSavedOffersCount > 0 ? (
            offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
          ) : (
            <p>Aucune offre sauvegardée.</p>
          )}
        </section>
        <section>
          <div className="containerTop">
            <h2>Mes candidatures</h2>
            <span className="offersCount">{isSavedOffersCount}</span>
          </div>
          <div className="gradientBar" />
          {isSavedOffersCount > 0 ? (
            offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
          ) : (
            <p>Aucune candidature sauvegardée.</p>
          )}
        </section>
      </main>
    </>
  );
}
