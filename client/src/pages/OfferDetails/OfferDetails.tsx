import "./OfferDetails.css";
import { useLoaderData } from "react-router-dom";

interface OfferTypes {
  id: number;
  title: string;
  offer_description: string;
  date: string;
  salary: number;
  profile: string;
  company_id: number;
  contract_id: number;
  name: string;
  company_description: string;
}

export default function OfferDetails() {
  const offer = useLoaderData() as OfferTypes;

  return (
    <article key={offer.id} className="all_detail_page">
      <section className="presentation">
        <h2>{offer.name}</h2>
        <h3>{offer.title}</h3>
        <p>Résumé du poste</p>
        <p>Compétences & expertises</p>
        <div className="buttons">
          <button type="button">Postuler</button>
          <button type="button">Enregistrer</button>
        </div>
      </section>
      <section className="le_poste">
        <h4>Le poste</h4>
        <p>
          <b>Descriptif du poste</b>
        </p>
        <p>{offer.offer_description}</p>
      </section>
      <section key={offer.id} className="entreprise">
        <h4>L'entreprise</h4>
        <h2>{offer.name}</h2>
        <p>
          <b>Description de l'entreprise</b>
        </p>
        <p>{offer.company_description}</p>
        <button type="button">Explore l'entreprise</button>
      </section>
      <section className="profil_recherché">
        <h4>Profil recherché</h4>
        <p>{offer.profile}</p>
      </section>
    </article>
  );
}
