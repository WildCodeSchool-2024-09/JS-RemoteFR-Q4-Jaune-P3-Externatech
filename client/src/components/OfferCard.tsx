import { Link } from "react-router-dom";
import "./offer-card.css";

function OfferCard({ offer }: OfferDataProps) {
  return (
    <article className="offer-card">
      <img src="/office-1.jpg" alt="équipe dans un bureau" />
      <div className="header-card">
        <img src="/logo-300- (1).png" alt="logo" />
        <div className="remote">
          <img src="/icon-home.png" alt="maison" />
          <p>{offer.remote_name}</p>
        </div>
      </div>
      <div className="company-info">
        <h2>{offer.title}</h2>
        <ul>
          <li>
            <strong>{offer.company_name}</strong>
          </li>
          <li>{offer.city}</li>
          <li>{offer.contract_name}</li>
        </ul>
      </div>
      <div className="actions-buttons">
        <Link to={`/OfferDetails/${offer.id}`} className="colored-box">
          VOIR L'OFFRE
        </Link>
        <Link to="/" className="light-box">
          VOIR LES CANDIDATURES
        </Link>
      </div>
    </article>
  );
}

export default OfferCard;
