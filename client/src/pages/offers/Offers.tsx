import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import OfferCard from "../../components/Offer-card/OfferCard";
import "./offers.css";

export default function Offers() {
  const { offers, stacks, cities, work_conditionOptions, contracts } =
    useLoaderData() as {
      offers: OfferData[];
      stacks: StackData[];
      cities: CityData[];
      work_conditionOptions: Work_conditionData[];
      contracts: ContractData[];
    };

  const [filters, setFilters] = useState({
    keyword: "",
    city: "",
    contract: "",
    stack: "",
    remote: "",
  });

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredOffers = offers.filter((offer) => {
    return (
      (filters.keyword === "" ||
        offer.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (filters.city === "" || offer.city === filters.city) &&
      (filters.contract === "" || offer.contract_name === filters.contract) &&
      (filters.stack === "" || offer.stack_names.includes(filters.stack)) &&
      (filters.remote === "" || offer.work_condition_name === filters.remote)
    );
  });

  return (
    <div className="containerAll">
      <Hero
        stacks={stacks}
        cities={cities}
        work_conditions={work_conditionOptions}
        contracts={contracts}
        onSearch={handleSearch}
      />

      <div className="containerTop">
        <h2>Les Offres </h2>
        <span className="offersCount">{filteredOffers.length}</span>
      </div>
      <div className="offerGradientBar" />

      <section className="resultSearche">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} editable={false} />
          ))
        ) : (
          <p className="no-offers">
            Nous n’avons pas trouvé de jobs pour votre recherche
          </p>
        )}
      </section>
    </div>
  );
}
