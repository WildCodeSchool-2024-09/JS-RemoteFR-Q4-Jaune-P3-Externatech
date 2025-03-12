import "./apply.css";
import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useParams } from "react-router";

export default function Apply({ isOpen, onClose }: LoginCompanyProps) {
  const params = useParams();

  const [candidateOffer, setCandidateOffer] = useState({
    offer_id: params.id,
    resume: "",
  });

  const handleSubmitApply: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidates_offers`,
        candidateOffer,

        {
          withCredentials: true,
        },
      );

      onClose();
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCandidateOffer((prev) => ({ ...prev, [name]: value }));
    console.info(candidateOffer);
  };

  return (
    <dialog className="dialog_login" open={isOpen}>
      <form onSubmit={handleSubmitApply}>
        <h2>Postuler</h2>

        <h3>Veuillez inserer votre CV : </h3>
        <input
          type="file"
          name="resume"
          value={candidateOffer.resume}
          onChange={handleChange}
          required
        />

        <button className="colored-box " type="submit">
          Postuler
        </button>
        <button className="light-box" type="button" onClick={onClose}>
          Annuler
        </button>
      </form>
    </dialog>
  );
}
