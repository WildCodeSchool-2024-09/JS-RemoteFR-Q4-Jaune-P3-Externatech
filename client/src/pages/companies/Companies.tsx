import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import CompanyCard from "../../components/company-card/CompanyCard";
import "./Companies.css";

export default function Companies() {
  const allCompanies = useLoaderData() as CompanyData[];
  return (
    <div className="containerAll_companies">
      <div className="containerTop">
        <h2>Les ENTREPRISES </h2>
      </div>
      <div className="offerGradientBar_companies" />
      <section className="resultSearche">
        {allCompanies.length > 0 ? (
          allCompanies.map((company) => (
            <Link to={`./${company.id}`} key={company.id}>
              <CompanyCard company={company} />
            </Link>
          ))
        ) : (
          <p className="no-offers">Nous n’avons pas trouvé d'entreprise.'</p>
        )}
      </section>
    </div>
  );
}
