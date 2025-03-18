import { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import "./offer-card.css";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import Apply from "../Apply/Apply";

function OfferCard({ offer }: OfferDataProps) {
  const { role } = useAuth();

  const { revalidate } = useRevalidator();

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const openApply = () => {
    setIsApplyOpen(!isApplyOpen);
    document.body.style.overflow = "hidden";
  };

  const closeApply = () => {
    setIsApplyOpen(false);
    document.body.style.overflow = "";
  };

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
        {role === "candidate" ? (
          <>
            <Apply isOpen={isApplyOpen} onClose={closeApply} />
            <button type="button" onClick={openApply} className="light-box">
              POSTULER
            </button>
          </>
        ) : null}
        <Link to={`/OfferDetails/${offer.id}`} className="light-box centered">
          VOIR L'OFFRE
        </Link>
        {role === "company" ? (
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
