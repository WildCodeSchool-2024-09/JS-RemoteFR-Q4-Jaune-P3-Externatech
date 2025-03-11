import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";
import "./candidatDashboard.css";
import { useEffect, useState } from "react";

export default function CandidatDashboard() {
  const offers = useLoaderData() as OfferData[];

  const [isSavedOffersCount, setIsSavedOffersCount] = useState<number>(
    offers.length,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedDate, setUpdatedDate] = useState<string>("12/02/2025");

  useEffect(() => {
    setIsSavedOffersCount(offers.length);
  }, [offers]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

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
                <button type="button" onClick={handleEditClick}>
                  Modifier
                </button>
              </h3>

              <ul className="square-list">
                <li className="text">
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedDate}
                      onChange={(e) => setUpdatedDate(e.target.value)}
                    />
                  ) : (
                    `dernière actualisation le ${updatedDate}`
                  )}
                </li>
              </ul>
              {isEditing && (
                <button type="button" onClick={handleSaveClick}>
                  Sauvegarder
                </button>
              )}
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
