import CompanyCard from "../../components/company-card/CompanyCard";
import "./homePage.css";
import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";

export default function HomePage() {
  const { companies, offers } = useLoaderData() as {
    companies: CompanyData[];
    offers: OfferData[];
  };
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
      <section className="home-page-offers">
        <h2>Nos dernières OFFRES</h2>
        <div className="gradientBar" />
        <ul className="scroll-card-container">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <li key={offer.id}>
                {" "}
                <OfferCard offer={offer} />
              </li>
            ))
          ) : (
            <li>Pas d'offre active</li>
          )}
        </ul>
      </section>
      <section className="greyBlock">
        <h2>Pourquoi nous REJOINDRE</h2>
        <button type="button">QU'ATTENDEZ-VOUS ?</button>
      </section>
      <section className="home-page-companies">
        <h2>Ils nous font CONFIANCE</h2>
        <ul className="scroll-card-container">
          {companies.map((company) => (
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
