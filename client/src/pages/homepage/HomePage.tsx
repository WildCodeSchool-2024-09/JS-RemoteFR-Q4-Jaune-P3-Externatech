import CompanyCard from "../../components/company-card/CompanyCard";
import "./homePage.css";
import { useLoaderData } from "react-router-dom";

export default function HomePage() {
  const allCompanies = useLoaderData() as CompanyData[];
  return (
    <>
      <header className="headerHomepage">
        <h1 id="h1Header">Ton futur au bout du clavier</h1>
        <p id="pHeader">Plus de 666 raisons de nous rejoindre</p>
        <input type="text" />
        <button className="colored-box" type="button">
          Trouver un job
        </button>
      </header>
      <section className="home-page">
        <h2>Nos dernières OFFRES</h2>
        <div className="gradientBar" />
      </section>
      <section className="greyBlock">
        <h2>Pourquoi nous REJOINDRE</h2>
        <button type="button">QU'ATTENDEZ-VOUS ?</button>
      </section>
      <section className="home-page">
        <h2>Ils nous font CONFIANCE</h2>
        <ul className="scroll-card-container">
          {allCompanies.map((company) => (
            <li key={company.id}>
              <CompanyCard company={company} />
            </li>
          ))}
        </ul>
        <div className="gradientBar" />
      </section>
    </>
  );
}
