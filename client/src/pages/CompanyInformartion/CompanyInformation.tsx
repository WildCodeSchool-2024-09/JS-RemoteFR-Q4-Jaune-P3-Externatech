import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getCompany } from "../../services/requests";
import "./CompagnyInformation.css";

export const companyLoader = async ({ params }: LoaderFunctionArgs) => {
  const companyId = params.companyId;

  if (!companyId || typeof companyId !== "string") {
    throw new Error("ID de l'entreprise invalide ou manquant");
  }

  try {
    const company = await getCompany(companyId);
    return company;
  } catch (error) {
    console.error("Erreur lors du chargement de la société :", error);
  }
};

export default function CompanyInformation() {
  const company = useLoaderData() as Company;

  return (
    <div className="container_CI">
      <h2 className="title_CI">Mes Informations:</h2>
      <section>
        <p>Nom de l'entreprise:</p>
        <p className="form_CI">{company?.name}</p>
        <p>Rue:</p>
        <p className="form_CI">{company?.address || "Non précisé"}</p>
        <p>Code postal:</p>
        <p className="form_CI">{company?.postalCode || "Non précisé"}</p>
        <p>Ville:</p>
        <p className="form_CI">{company?.city || "Non précisé"}</p>
        <p>E-mail:</p>
        <p className="form_CI">{company?.email || "Non précisé"}</p>
        <p>Taille de l'entreprise:</p>
        <select className="form_CI" value={company?.size}>
          <option value="1-15">1-15</option>
          <option value="16-49">16-49</option>
          <option value="50-99">50-99</option>
          <option value="100-500">100-500</option>
          <option value="500+">500+</option>
        </select>
        <p>Site web:</p>
        <p className="form_CI">{company?.website || "Non précisé"}</p>
        <p>Siret (14 chiffres):</p>
        <p className="form_CI">{company?.siret || "Non précisé"}</p>
        <p>Description:</p>
        <p className="form_CI">{company?.description || "Non précisé"}</p>
      </section>
    </div>
  );
}
