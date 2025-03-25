import { useEffect, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import "./offer-card.css";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { useOffersContext } from "../../services/OffersContext";
import Apply from "../Apply/Apply";
import Login from "../NavBar/Login";

function OfferCard({
  offer,
  isAppliedSection,
}: OfferDataProps & { isAppliedSection?: boolean }) {
  const { role } = useAuth();
  const { registeredOffers, toggleBookmark } = useOffersContext();
  const [isBookmarked, setIsBookmarked] = useState(
    registeredOffers.some((o) => o.id === offer.id),
  );
  const isOnCompanyDashboardPage = location.pathname.startsWith(
    "/companies/dashboard",
  );
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleBookmark = () => {
    if (isAppliedSection) return; // Désactive le bookmark dans les candidatures
    toggleBookmark(offer, isBookmarked);
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

  useEffect(() => {
    setIsBookmarked(registeredOffers.some((o) => o.id === offer.id));
  }, [registeredOffers, offer.id]);

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
        {role === "candidate" ? (
          <>
            <Apply isOpen={isApplyOpen} onClose={closeApply} />
            <button type="button" onClick={openApply} className="light-box">
              POSTULER
            </button>
            <button
              type="button"
              className={`register ${isBookmarked ? "bookmarked" : ""}`}
              onClick={handleBookmark}
            >
              <img
                src={
                  isBookmarked
                    ? "/Logos/Icon_bookmark_filled.png"
                    : "/Logos/Icon_bookmark.png"
                }
                alt="bookmark"
                className="bookmark"
              />
            </button>
          </>
        ) : null}
        {role === "anonymous" ? (
          <>
            <Login isOpen={isModalOpen} onClose={closeModal} />
            <button type="button" className="apply" onClick={openModal}>
              Postuler
            </button>
            <button type="button" className="register" onClick={openModal}>
              <img
                src="/Logos/Icon_bookmark.png"
                alt="bookmark"
                className="bookmark"
              />
            </button>
          </>
        ) : null}

        <Link to={`/OfferDetails/${offer.id}`} className="light-box centered">
          VOIR L'OFFRE
        </Link>
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
