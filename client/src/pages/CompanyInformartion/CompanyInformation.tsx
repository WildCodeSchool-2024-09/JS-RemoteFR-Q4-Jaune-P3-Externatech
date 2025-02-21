import { useLoaderData } from "react-router-dom";
import { getCompany } from "../../services/requests";
import "./CompagnyInformation.css";

export async function companyLoader() {
  const companyId = "1";

  try {
    const company = await getCompany(companyId);
    return company || null;
  } catch (error) {
    console.error("Erreur lors du chargement de la société :", error);
    return null;
  }
}

export default function CompanyInformation() {
  const company = useLoaderData() as Company | null;

  if (!company) {
    return <p>Erreur lors du chargement des données.</p>;
  }
  return (
    <div className="container_CI">
      <h2 className="title_CI">Mes Informations:</h2>
      <section>
        <p>Nom de l'entreprise:</p>
        <p className="form_CI">{company?.name}</p>
        <p>Rue:</p>
        <p className="form_CI">Rue de Rivoli </p>
        <p>code postal:</p>
        <p className="form_CI">75000</p>
        <p>Ville:</p>
        <p className="form_CI">PARIS</p>
        <p>E-mail:</p>
        <p className="form_CI">lorem@gmail.com</p>
        <p>Taille de l'entreprise:</p>
        <select className="form_CI">
          <option value="1-15">1-15</option>
          <option value="16-49">16-49</option>
          <option value="50-99">50-99</option>
          <option value="100-500">100-500</option>
          <option value="500+">500+</option>
        </select>
        <p>Site web:</p>
        <p className="form_CI">www.</p>
        <p>Siret (14 chiffres):</p>
        <p className="form_CI">794 926 063 00304</p>
        <p>description:</p>
        <p className="form_CI">{company?.description}</p>
      </section>
    </div>
  );
}
