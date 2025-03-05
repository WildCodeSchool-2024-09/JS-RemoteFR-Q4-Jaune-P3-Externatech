import { useLoaderData } from "react-router-dom";
import OfferCard from "../../components/OfferCard";
import "./offers.css";

export default function Offers() {
  const allOffers = useLoaderData() as OfferData[];
  console.info(allOffers);
  return (
    <div className="containerAll">
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
