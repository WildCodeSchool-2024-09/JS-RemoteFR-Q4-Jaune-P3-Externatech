import { useLoaderData } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import OfferCard from "../../components/OfferCard";
import "./offers.css";

export default function Offers() {
  const allOffers = useLoaderData() as OfferData[];

  return (
    <div className="containerAll">
      <Hero />
      <div className="containerTop">
        <h2>Les Offres</h2>
        {<span className="offersCount">{allOffers.length}</span>}
      </div>
      <div className="gradientBar" />
      {allOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
