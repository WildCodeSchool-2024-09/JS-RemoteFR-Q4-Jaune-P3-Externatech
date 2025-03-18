import "./OfferDetails.css";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Link } from "react-router-dom";
import Apply from "../../components/Apply/Apply";
import Login from "../../components/NavBar/Login";
import { useAuth } from "../../services/AuthContext";

export default function OfferDetails() {
  const offer = useLoaderData() as OfferData;
  const { role, id } = useAuth();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const openApply = () => {
    setIsApplyOpen(!isApplyOpen);
    document.body.style.overflow = "hidden";
  };

  const closeApply = () => {
    setIsApplyOpen(false);
    document.body.style.overflow = "";
  };

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
    <main className="all_detail_page">
      <Apply isOpen={isApplyOpen} onClose={closeApply} />
      <article className="presentation">
        <section className="title_logo">
          <img src={offer.company_logo} alt="logo" className="logo_company" />
          <h1 className="offername">{offer.company_name}</h1>
        </section>
        <h2 className="offertitle">{offer.title}</h2>
        <h3>Résumé du poste</h3>
        <section className="resume_content">
          <p>{offer.contract_name}</p>
          <p>{offer.city}</p>
          <p>{offer.work_condition_name}</p>
        </section>
        <h3>Compétences & expertises</h3>
        <p className="skills">{offer.stack_names}</p>
        <section className="buttons">
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
                Enregistrer
              </button>
            </>
          ) : null}
          {role === "candidate" ? (
            <>
              <button type="button" className="apply" onClick={openApply}>
                Postuler
              </button>
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
                Enregistrer
              </button>
            </>
          ) : null}
          {role === "company" && id === offer.company_id ? (
            <>
              <button type="button">Voir les candidatures</button>
              <button
                type="button"
                onClick={async () => {
                  await deleteOffer(offer.id);
                  navigate(-1);
                }}
              >
                SUPPRIMER
              </button>
            </>
          ) : null}
        </section>
      </article>

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
      <article className="the_offer">
        <section className="title_the_offer">
          <img src="/Logos/Icon_inbox.png" alt="box" className="box_png" />
          <h2 className="offer_title">Le poste</h2>
        </section>
        <p>
          <b>Descriptif du poste</b>
        </p>
        <p>{offer.description}</p>
      </article>
      <article className="the_company">
        <section className="title_company">
          <img
            src="/Logos/Icon_company.png"
            alt="company"
            className="company"
          />
          <h2 className="the_company_title">L'entreprise</h2>
        </section>
        <section className="title_logo_2">
          <img src={offer.company_logo} alt="logo" className="logo_company" />
          <h1 className="offername">{offer.company_name}</h1>
        </section>
        <p>
          <b>Description de l'entreprise</b>
        </p>
        <p>{offer.company_description}</p>
        <Link to={`/companies/${offer.company_id}`} className="explore">
          Explore l'entreprise
        </Link>
      </article>
      <article className="profile_search">
        <section className="searched_profile">
          <img src="/Logos/Icon_profil.png" alt="people" className="people" />
          <h2 className="search_profil_title">Profil recherché</h2>
        </section>
        <p>{offer.profile}</p>
      </article>
    </main>
  );
}
