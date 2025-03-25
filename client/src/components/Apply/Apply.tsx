import "./apply.css";
import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Apply({ isOpen, onClose }: LoginCompanyProps) {
  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [resume, setResume] = useState(undefined as undefined | File);

  const handleSubmitApply: FormEventHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("offer_id", String(params.id));
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/candidates_offers`,
        formData,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      setResume(e.currentTarget.files[0]);
    }
  };

  return (
    <>
      <dialog className="dialog_apply" open={isOpen}>
        <form onSubmit={handleSubmitApply}>
          <h2>Je postule ! </h2>
          <h3>Veuillez inserer votre CV : </h3>
          <input type="file" name="resume" onChange={handleChange} required />
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
