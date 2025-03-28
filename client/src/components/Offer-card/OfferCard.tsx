import { useState } from "react";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <img src="/house.svg" alt="maison" />
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
            <button
              type="button"
              className="register"
              onClick={handleOpenModal}
            >
              <img
                src="/Logos/Icon_bookmark.png"
                alt="bookmark"
                className="bookmark"
              />
            </button>
          </>
        ) : null}
        {role === "anonymous" ? (
          <>
            <Login isOpen={isModalOpen} onClose={closeModal} />

            <button type="button" className="register" onClick={openModal}>
              <img
                src="/Logos/Icon_bookmark.png"
                alt="bookmark"
                className="bookmark"
              />
            </button>
          </>
        ) : null}
        {showModal && (
          <section className="modal">
            <section className="modal-content">
              <h2>Succès</h2>
              <p className="registered_p">Cette offre a été enregistrée !</p>
              <Link to="/RegisteredOffers" className="registered_offers">
                Voir mes offres enregistrées
              </Link>
              <button
                type="button"
                className="close_button"
                onClick={handleCloseModal}
              >
                Fermer
              </button>
            </section>
          </section>
        )}
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
