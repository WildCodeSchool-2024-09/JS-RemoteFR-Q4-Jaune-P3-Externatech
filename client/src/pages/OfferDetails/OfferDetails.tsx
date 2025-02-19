import "./OfferDetails.css";
import { useLoaderData } from "react-router-dom";

interface OfferTypes {
  id: number;
  title: string;
  description: string;
  date: string;
  salary: number;
  requirements: string;
  company_id: number;
  contract_id: number;
}

interface CompaniesType {
  id: number;
  name: string;
  description: string;
}

interface OfferDetailsTypes {
  offers: OfferTypes;
  companies: CompaniesType[];
}

export default function OfferDetails() {
  const { offers, companies } = useLoaderData() as OfferDetailsTypes;
  const company = companies.find((company) => company.id === offers.company_id);

  if (!company) {
    return <p>Company not found for offer: {offers.title}</p>;
  }

  return (
    <article key={offers.id} className="all_detail_page">
      <section className="presentation">
        <h2>{company.name}</h2>
        <h3>{offers.title}</h3>
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
        <p>{offers.description}</p>
      </section>
      <section key={offers.id} className="entreprise">
        <h4>L'entreprise</h4>
        <h2>{company.name}</h2>
        <p>
          <b>Description de l'entreprise</b>
        </p>
        <p>{company.description}</p>
        <button type="button">Explore l'entreprise</button>
      </section>
      <section className="profil_recherché">
        <h4>Profil recherché</h4>
        <p>{offers.requirements}</p>
      </section>
    </article>
  );
}
