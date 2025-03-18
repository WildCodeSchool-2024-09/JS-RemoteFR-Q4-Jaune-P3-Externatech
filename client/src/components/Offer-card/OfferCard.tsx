import { Link, useLocation, useRevalidator } from "react-router-dom";
import "./offer-card.css";
import axios from "axios";
function OfferCard({ offer }: OfferDataProps) {
  const location = useLocation();
  const { revalidate } = useRevalidator();

  const isOnCompanyDashboardPage = location.pathname.startsWith(
    "/companies/dashboard",
  );

  const deleteOffer = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/offers/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          revalidate();
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'offre :", error);
        });
    }
  };

  return (
    <article className="offer-card">
      <img src={offer.background} alt="équipe dans un bureau" />
      <div className="header-card">
        <img src={offer.company_logo} alt="logo" />
        <div className="remote">
          <img src="/icon-home.png" alt="maison" />
          <p>{offer.work_condition_name}</p>
        </div>
      </div>
      <div className="company-info">
        <h3>{offer.title}</h3>
        <p className="status">{offer.status}</p>
        <ul>
          <li>
            <strong>{offer.company_name}</strong>
          </li>
          <li>{offer.city}</li>
          <li>{offer.contract_name}</li>
          <li>{offer.stack_names ? offer.stack_names : "No data"}</li>
        </ul>
      </div>
      <div className="actions-buttons">
        <Link to={`/OfferDetails/${offer.id}`} className="light-box centered">
          VOIR L'OFFRE
        </Link>

        {isOnCompanyDashboardPage ? (
          <button
            type="button"
            onClick={() => deleteOffer(offer.id)}
            className="light-box"
          >
            SUPPRIMER
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default OfferCard;
