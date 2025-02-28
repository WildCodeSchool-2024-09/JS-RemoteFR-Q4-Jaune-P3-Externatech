import "./Offer.css";
import Hero from "../../components/Hero/Hero";

export default function Offer() {
  return (
    <>
      <div className="full-width">
        <Hero />
      </div>
      <article className="offer">
        <h3>Les OFFRES</h3>
        <div className="trait-gradient"> </div>
      </article>
      <section className="offerdetails">
        <p>offre 1</p>
        <p>offre 2</p>
        <p>offre 3</p>
        <p>offre 4</p>
        <p>offre 5</p>
      </section>
    </>
  );
}
