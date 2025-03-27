import { Link, useNavigate, useRevalidator } from "react-router-dom";
import "./offer-card.css";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";

function OfferCard({ offer, editable }: OfferDataProps) {
  const { role } = useAuth();
  const navigate = useNavigate();
  const isOnCompanyDashboardPage = location.pathname.startsWith(
    "/companies/dashboard",
  );
  const isOnCandidateDashboardPage = location.pathname.startsWith(
    "/candidates/dashboard",
  );
  const { revalidate } = useRevalidator();

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
      <Link to={`/OfferDetails/${offer.id}`}>
        <img
          className="offer-background"
          src={offer.background}
          alt="équipe dans un bureau"
        />
        <div className="header-card">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/logo/${offer.company_logo}`}
            alt="logo"
          />
          <div className="remote">
            <img src="/icon-home.png" alt="maison" />
            <p>{offer.work_condition_name}</p>
          </div>
        </div>
        <div className="company-info">
          <h3>{offer.title}</h3>
          {isOnCandidateDashboardPage ? (
            <p className="status">{offer.status}</p>
          ) : null}
          <ul>
            <li>
              <strong>{offer.company_name}</strong>
            </li>
            <li>{offer.city}</li>
            <li>{offer.contract_name}</li>
            <li>{offer.stack_names ? offer.stack_names : "No data"}</li>
          </ul>
        </div>
      </Link>
      <div className="actions-buttons">
        {role !== "company" ? (
          <Link to={`/OfferDetails/${offer.id}`} className="light-box centered">
            VOIR L'OFFRE
          </Link>
        ) : null}

        {editable === true && isOnCompanyDashboardPage ? (
          <button
            type="button"
            onClick={() => navigate(`./edit-offer/${offer.id}`)}
            className="light-box"
          >
            MODIFIER
          </button>
        ) : null}
        {role === "company" && isOnCompanyDashboardPage ? (
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
