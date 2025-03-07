import { Link, useLocation } from "react-router-dom";
import "./offer-card.css";

function OfferCard({ offer }: OfferDataProps) {
  const location = useLocation();

  const isOnOffersPage = location.pathname === "/Offers/" || "/Offers";

  return (
    <article className="offer-card">
      <img src={offer.background} alt="équipe dans un bureau" />
      <div className="header-card">
        <img src={offer.company_logo} alt="logo" />
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
        {isOnOffersPage ? (
          <Link to={`/OfferDetails/${offer.id}`} className="light-box centered">
            VOIR LES OFFRES
          </Link>
        ) : (
          <Link to={`/OfferDetails/${offer.id}`} className="light-box">
            VOIR L'OFFRE
          </Link>
        )}
        {isOnOffersPage ? null : (
          <Link to="/" className="light-box">
            VOIR LES CANDIDATURES
          </Link>
        )}
      </div>
    </article>
  );
}

export default OfferCard;
