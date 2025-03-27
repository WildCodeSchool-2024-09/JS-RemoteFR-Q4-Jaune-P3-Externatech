import { Link, useLoaderData } from "react-router-dom";
import CandidateCard from "../../components/candidateCard/CandidateCard";
import "./companyApplies.css";

function CompanyApplies() {
  const applies = useLoaderData() as CandidateOfferData[];
  console.info(applies);

  return (
    <main className="company-applies">
      <h2>Candidatures reçues pour : {applies[0].offer_title}</h2>
      <Link
        to={`/OfferDetails/${applies[0].offer_id}`}
        className="colored-box "
      >
        VOIR L'OFFRE
      </Link>
      <ul>
        {applies.length > 0 ? (
          applies.map((apply) => (
            <li key={apply.id}>
              <CandidateCard candidateOffer={apply} />
            </li>
          ))
        ) : (
          <li>Pas de candidature en cours</li>
        )}
      </ul>
    </main>
  );
}

export default CompanyApplies;
