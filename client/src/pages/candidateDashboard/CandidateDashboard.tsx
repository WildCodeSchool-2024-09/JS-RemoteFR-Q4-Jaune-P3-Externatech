import "./candidateDashboard.css";

import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";
import "./candidateDashboard.css";

export default function CandidateDashboard() {
  const applies = useLoaderData() as OfferData[];
  console.info(applies);
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
          <OfferCard key={apply.id} offer={apply} />
        ))}
      </main>
    </>
  );
}
