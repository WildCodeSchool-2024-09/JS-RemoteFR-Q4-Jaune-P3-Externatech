import { useRevalidator } from "react-router-dom";
import "./candidate-card.css";
import axios from "axios";

export default function CandidateCard({ candidateOffer }: CandidateOfferProps) {
  const { revalidate } = useRevalidator();

  const handleClickStatus = (status: number) => {
    const updateStatus = {
      application_status_id: status,
      id: candidateOffer.id,
      candidate_id: candidateOffer.candidate_id,
    };
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/candidates_offers`,
        { updateStatus },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        revalidate();
      })
      .catch((error) => {
        console.error("Erreur lors du changement de :", error);
      });
  };

  function displayStatus() {
    if (candidateOffer.application_status_id === 1) {
      return "status";
    }
    if (candidateOffer.application_status_id === 2) {
      return "status accepted";
    }
    if (candidateOffer.application_status_id === 3) {
      return "status rejected";
    }
  }

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
        <p className={displayStatus()}>{candidateOffer.status}</p>
        <section className="actions">
          <button type="button" className="light-box">
            VOIR LE PROFIL
          </button>
          <button
            type="submit"
            className="colored-box"
            onClick={() => handleClickStatus(2)}
          >
            ACCEPTER
          </button>
          <button
            type="submit"
            className="light-box"
            onClick={() => handleClickStatus(3)}
          >
            REFUSER
          </button>
        </section>
      </article>
    </>
  );
}
