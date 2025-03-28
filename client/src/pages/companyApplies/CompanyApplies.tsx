import { Link, useLoaderData } from "react-router-dom";
import CandidateCard from "../../components/Candidate-card/CandidateCard";
import OfferCard from "../../components/Offer-card/OfferCard";
import "./company-applies.css";

function CompanyApplies() {
  const { applies, offer } = useLoaderData() as {
    applies: CandidateOfferData[];
    offer: OfferData;
  };

  return applies.length > 0 ? (
    <main className="company-applies">
      <h2>Candidatures reçues pour : {applies[0].offer_title}</h2>
      <Link to={`/OfferDetails/${applies[0].offer_id}`} className="colored-box">
        VOIR L'OFFRE
      </Link>
      <ul>
        {applies.map((apply) => (
          <li key={apply.id}>
            <CandidateCard candidateOffer={apply} />
          </li>
        ))}
      </ul>
    </main>
  ) : (
    <main className="no-offer">
      <p>Pas de candidature en cours pour :</p>
      <h2>{offer.title}</h2>
      <OfferCard key={offer.id} offer={offer} editable={true} />
    </main>
  );
}

export default CompanyApplies;
