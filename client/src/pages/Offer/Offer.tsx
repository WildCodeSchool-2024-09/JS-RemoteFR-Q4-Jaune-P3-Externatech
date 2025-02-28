import "./Offer.css";
import Hero from "../../components/Hero/Hero";
// import { useLoaderData } from "react-router-dom";

export default function Offer() {
  // const data = useLoaderData() as language;

  return (
    // <main>
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
    // </main>
  );
}
