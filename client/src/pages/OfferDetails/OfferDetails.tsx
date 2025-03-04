import "./OfferDetails.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

interface OfferTypes {
  id: number;
  title: string;
  city: string;
  logo: string;
  background: string;
  offer_description: string;
  salary: number;
  profile: string;
  company_id: number;
  contract_id: number;
  contract_name: string;
  remote: string;
  name: string;
  company_description: string;
  stack_names: string;
}

export default function OfferDetails() {
  const offer = useLoaderData() as OfferTypes;

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main className="all_detail_page">
      <article className="presentation">
        <section className="title_logo">
          <img src={offer.logo} alt="logo" className="logo_company" />
          <h1 className="offername">{offer.name}</h1>
        </section>
        <h2 className="offertitle">{offer.title}</h2>
        <h3>Résumé du poste</h3>
        <section className="resume_content">
          <p>{offer.contract_name}</p>
          <p>{offer.city}</p>
          <p>{offer.remote}</p>
        </section>
        <h3>Compétences & expertises</h3>
        <p className="skills">{offer.stack_names}</p>
        <section className="buttons">
          <Link to="/Apply" className="apply">
            Postuler
          </Link>
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
        <p>{offer.offer_description}</p>
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
          <img src={offer.logo} alt="logo" className="logo_company" />
          <h1 className="offername">{offer.name}</h1>
        </section>
        <p>
          <b>Description de l'entreprise</b>
        </p>
        <p>{offer.company_description}</p>
        <Link to={`/companies/${offer.company_id}`} className="explore">
          Explore l'entreprise
        </Link>
      </article>
      <article className="profil_recherché">
        <section className="profil_titre">
          <img src="/Logos/Icon_profil.png" alt="people" className="people" />
          <h2 className="profil_recherche">Profil recherché</h2>
        </section>
        <p>{offer.profile}</p>
      </article>
    </main>
  );
}
