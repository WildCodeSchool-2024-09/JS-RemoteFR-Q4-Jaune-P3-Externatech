import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import OfferCard from "../../components/OfferCard";
import "./offers.css";

export default function Offers() {
  const { offers, stacks, cities, remoteOptions, contracts } =
    useLoaderData() as {
      offers: OfferData[];
      stacks: StackData[];
      cities: CityData[];
      remoteOptions: RemoteData[];
      contracts: ContractData[];
    };

  return (
    <div className="containerAll">
      <Hero
        stacks={stacks}
        cities={cities}
        remoteOptions={remoteOptions}
        contracts={contracts}
      />

      <div className="containerTop">
        <h2>Les Offres</h2>
        <span className="offersCount">{offers.length}</span>
      </div>
      <div className="gradientBar" />
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
