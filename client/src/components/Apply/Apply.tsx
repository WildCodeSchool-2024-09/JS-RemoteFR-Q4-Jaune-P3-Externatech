import "./apply.css";
import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Apply({ isOpen, onClose }: LoginCompanyProps) {
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");
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

      setErrorMessage("");
      toast.success("Offre ajoutée avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",

        transition: Bounce,
        onClose: () => {
          onClose();
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de la candidature de l'offre :", error);
        setErrorMessage(error.response?.data.error);
      } else {
        console.error("Une erreur inattendue s'est produite :", error);
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCandidateOffer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <dialog className="dialog_apply" open={isOpen}>
        <form onSubmit={handleSubmitApply}>
          <h2>Je postule ! </h2>
          <h3>Veuillez inserer votre CV : </h3>
          <input
            type="file"
            name="resume"
            value={candidateOffer.resume}
            onChange={handleChange}
            required
          />
          <p>{errorMessage}</p>
          <div>
            <button className="colored-box " type="submit">
              Postuler
            </button>
            <button className="light-box" type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </dialog>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </>
  );
}
