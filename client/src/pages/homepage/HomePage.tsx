import CompanyCard from "../../components/company-card/CompanyCard";
import "./homePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/Offer-card/OfferCard";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { companies, offers } = useLoaderData() as {
    companies: CompanyData[];
    offers: OfferData[];
  };
  console.info(offers);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    navigate("/offers", { state: { searchValue } });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <header className="headerHomepage">
        <h1 id="h1Header">Ton futur au bout du clavier</h1>
        <p id="pHeader">Plus de 666 raisons de nous rejoindre</p>

        <div className="search-bar">
          <input
            className="input-homepage"
            type="text"
            placeholder="Recherche..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="colored-box-homepage"
            type="button"
            onClick={handleSearch}
          >
            Trouver un job
          </button>
        </div>
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
        <h2 className="why-join-us">Pourquoi nous rejoindre ?</h2>
        <Link to="/seconnecter">
          <button className="colored-box-homepage-business" type="button">
            N'attendez plus
          </button>
        </Link>
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
