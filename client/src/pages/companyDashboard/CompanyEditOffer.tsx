import { useState } from "react";
import "./company-edit-offer.css";
import "./company-dashboard.css";
import "./offerForm.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import { Bounce, ToastContainer, toast } from "react-toastify";

function CompanyEditOffer() {
  const offer = useLoaderData() as OfferData;

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<OfferDataForm>(() => ({
    title: offer?.title || "",
    city: offer?.city || "",
    background: offer?.background || "",
    description: offer?.description || "",
    salary: offer?.salary || 0,
    profile: offer?.profile || "",
    work_condition_id: offer?.work_condition_id || 0,
    contract_id: offer?.contract_id || 0,
  }));
  const handleOfferSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/offers/${offer.id}`,
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
      });
      console.info("Offre modifiée avec succès !");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de la modification de l'offre :", error);
        setErrorMessage(error.response?.data?.error || "Erreur inconnue");
        toast.error("Erreur lors de l'ajout de l'offre !", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Une erreur inattendue s'est produite :", error);
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ["work_condition_id", "contract_id", "salary"].includes(name) &&
        value !== ""
          ? Number(value)
          : value,
    }));
  };

  const maxLengths = {
    title: 250,
    city: 250,
  };

  return (
    <>
      <main className="company-edit-offer company-dashboard">
        <h2>MODIFIER UNE OFFRE</h2>
        <form className="form-offer" onSubmit={handleOfferSubmit}>
          <p> * champs obligatoires </p>

          <label>
            Quel est le titre du poste ? *
            <textarea
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={maxLengths.title}
            />
            <p>
              {maxLengths.title - formData.title?.length}/{maxLengths.title}
            </p>
          </label>
          <label>
            Dans quelle ville se situe le poste ? *
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              maxLength={maxLengths.city}
            />
            <p>
              {maxLengths.city - formData.city?.length}/{maxLengths.city}
            </p>
          </label>
          <label>
            Quel type de profil recherchez-vous ? *
            <textarea
              rows={4}
              name="profile"
              value={formData.profile}
              onChange={handleChange}
            />
          </label>
          <label>
            Décrivez les missions et attentes du poste *
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Le poste est-il en télétravail ? *
            <select
              name="work_condition_id"
              value={formData.work_condition_id}
              onChange={handleChange}
            >
              <option value="">-- Sélectionnez une option --</option>
              <option value="1">Sur site</option>
              <option value="2">Télétravail hybride</option>
              <option value="3">Full remote</option>
            </select>
          </label>

          <label>
            Quel est le salaire proposé ? *
            <input
              type="number"
              name="salary"
              value={Number(formData.salary)}
              onChange={handleChange}
            />
          </label>
          <label>
            Quel est le type de contrat que vous proposez ?
            <select
              name="contract_id"
              value={formData.contract_id}
              onChange={handleChange}
            >
              <option value="">-- Sélectionnez une option --</option>
              <option value="1">CDI</option>
              <option value="2">CDD</option>
              <option value="3">Stage</option>
              <option value="4">Alternance</option>
              <option value="5">Freelance</option>
            </select>
          </label>
          <label>
            Ajoutez votre background
            <input
              type="text"
              name="background"
              value={formData.background}
              onChange={handleChange}
            />
          </label>
          <p className="errorMessage">{errorMessage}</p>
          <button className="colored-box" type="submit">
            ENREGISTRER
          </button>
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
    </>
  );
}

export default CompanyEditOffer;
