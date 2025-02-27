import { Link } from "react-router-dom";
import "./offer-card.css";

function OfferCard() {
  return (
    <article className="offer-card">
      <img src="/office-1.jpg" alt="équipe dans un bureau" />
      <div className="header-card">
        <img src="/logo-300- (1).png" alt="logo" />
        <div className="remote">
          <img src="/icon-home.png" alt="maison" />
          <p>Télétravail</p>
        </div>
      </div>
      <div className="company-info">
        <h2>Développeur Full Stack</h2>
        <ul>
          <li>
            <strong>Tech Innov</strong>
          </li>
          <li>Paris</li>
          <li>CDD</li>
        </ul>
      </div>
      <div className="actions-buttons">
        <Link to="/" className="colored-box">
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
