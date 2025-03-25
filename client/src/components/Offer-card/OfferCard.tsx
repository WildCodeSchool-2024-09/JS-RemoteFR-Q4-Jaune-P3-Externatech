import { useEffect, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import "./offer-card.css";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import Login from "../NavBar/Login";

function OfferCard({ offer }: OfferDataProps) {
  const { role } = useAuth();
  const isOnCompanyDashboardPage = location.pathname.startsWith(
    "/companies/dashboard",
  );
  const { revalidate } = useRevalidator();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/candidates_offers/registered`,
        {
          withCredentials: true,
        },
      );
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (!isBookmarked) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/registered/${offer.id}`,
          {
            withCredentials: true,
          },
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/candidates_offers/registered`,
          {
            offerId: offer.id,
          },
          {
            withCredentials: true,
          },
        );
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
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
        {role === "candidate" ? <p className="status">{offer.status}</p> : null}
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
            <button type="button" className="register" onClick={toggleBookmark}>
              <img
                src={
                  isBookmarked
                    ? "/Logos/Icon_bookmark_green.png"
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
