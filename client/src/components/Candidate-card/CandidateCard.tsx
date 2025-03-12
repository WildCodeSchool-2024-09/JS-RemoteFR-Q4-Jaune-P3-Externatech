import "./candidate-card.css";

export default function CandidateCard({ candidateOffer }: CandidateOfferProps) {
  return (
    <>
      <article className="candidate-card">
        <section className="identity">
          <p>
            {candidateOffer.candidate_firstname}{" "}
            {candidateOffer.candidate_lastname}
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
            alt={`${candidateOffer.candidate_name}`}
          />
        </section>
        <p className="bold">{candidateOffer.candidate_email}</p>

        <h3 className="colored-box">{candidateOffer.offer_title}</h3>
        <section className="actions">
          <button type="button" className="light-box">
            VOIR LE PROFIL
          </button>
          <button type="button" className="colored-box">
            ACCEPTER
          </button>
          <button type="button" className="light-box">
            REFUSER
          </button>
        </section>
      </article>
    </>
  );
}
