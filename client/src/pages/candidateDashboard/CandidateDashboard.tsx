import "./candidateDashboard.css";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";
import { useOffersContext } from "../../services/OffersContext";

import "./candidateDashboard.css";

export default function CandidateDashboard() {
  const { applies } = useLoaderData() as {
    applies: OfferData[];
  };

  const { registeredOffers, fetchRegisteredOffers } = useOffersContext();

  useEffect(() => {
    fetchRegisteredOffers();
  }, [fetchRegisteredOffers]);

  return (
    <>
      <header className="headerCandidat">
        <h1>Bienvenue </h1>
      </header>
      <main className="candidatDashboard">
        <div className="apply">
          <h2>Mes candidatures</h2>
          <p className="offersCount">{applies.length}</p>
        </div>
        <div className="gradientBar" />
        {applies.map((apply) => (
          <OfferCard key={apply.id} offer={apply} isAppliedSection />
        ))}

        <div className="apply">
          <h2>Mes Offres enregistrées</h2>
          <p className="offersCount">{registeredOffers.length}</p>
        </div>
        <div className="gradientBar" />
        {registeredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </main>
    </>
  );
}
