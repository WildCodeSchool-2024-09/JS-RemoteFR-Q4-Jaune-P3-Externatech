import { useLoaderData } from "react-router-dom";
import "./CompagnyInformation.css";

export default function CompanyInformation() {
  const company = useLoaderData() as CompanyData;
  return (
    <div className="container_CI">
      <h2 className="title_CI">Mes Informations:</h2>
      <section>
        <img
          className="form_CI logo"
          src={company.logo}
          alt={`logo de l'entreprise ${company.name}`}
        />
        <p>Nom de l'entreprise:</p>
        <p className="form_CI">{company.name}</p>
        <p>Rue:</p>
        <p className="form_CI">{company.address}</p>
        <p>Code postal:</p>
        <p className="form_CI">{company.postalCode}</p>
        <p>Ville:</p>
        <p className="form_CI">{company.city}</p>
        <p>E-mail:</p>
        <p className="form_CI">{company.email}</p>
        <p>Taille de l'entreprise:</p>
        <select className="form_CI" value={company.size}>
          <option value="1-15">1-15</option>
          <option value="16-49">16-49</option>
          <option value="50-99">50-99</option>
          <option value="100-500">100-500</option>
          <option value="500+">500+</option>
        </select>
        <p>Site web:</p>
        <p className="form_CI">{company.website}</p>
        <p>Siret (14 chiffres):</p>
        <p className="form_CI">{company.siret}</p>
        <p>Description:</p>
        <p className="form_CI">{company.description}</p>
      </section>
    </div>
  );
}
