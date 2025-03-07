import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import OfferCard from "../../components/OfferCard";
import "./offers.css";

export default function Offers() {
  const { offers, stacks, cities } = useLoaderData() as {
    offers: OfferData[];
    stacks: StackType[];
    cities: CityType[];
  };
  console.info(offers);
  return (
    <div className="containerAll">
      <Hero stacks={stacks} cities={cities} />
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
