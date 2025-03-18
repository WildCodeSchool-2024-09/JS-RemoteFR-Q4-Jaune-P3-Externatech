import "./OfferDetails.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Apply from "../../components/Apply/Apply";

export default function OfferDetails() {
  const offer = useLoaderData() as OfferData;

  const [showModal, setShowModal] = useState(false);

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
          <button type="button" className="apply" onClick={openApply}>
            Postuler
          </button>
          <button type="button" className="register" onClick={handleOpenModal}>
            <img
              src="/Logos/Icon_bookmark.png"
              alt="bookmark"
              className="bookmark"
            />
            Enregistrer
          </button>
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
