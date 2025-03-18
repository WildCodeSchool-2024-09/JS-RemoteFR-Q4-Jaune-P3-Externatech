import { useLoaderData } from "react-router-dom";
import CompanyCard from "../../components/company-card/CompanyCard";

export default function Companies() {
  const allCompanies = useLoaderData() as CompanyData[];
  return (
    <div className="containerAll">
      <div className="containerTop">
        <h2>Les ENTREPRISES </h2>
        {/* <span className="offersCount">{allCompanies.length}</span> */}
      </div>
      <div className="offerGradientBar" />
      <section className="resultSearche">
        {allCompanies.length > 0 ? (
          allCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <p className="no-offers">Nous n’avons pas trouvé d'entreprise.'</p>
        )}
      </section>
    </div>
  );
}
