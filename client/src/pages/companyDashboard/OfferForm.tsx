import "./offerForm.css";

import { useState } from "react";
function OfferForm({ children, value, onSubmit }: OfferFormProps) {
  const [formData, setFormData] = useState(value);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const maxLengths = {
    title: 250,
    city: 250,
  };

  return (
    <>
      <form
        className="form-offer"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(formData);
        }}
      >
        <p> * champs obligatoires </p>

        <label>
          Quel est le titre du poste ? *
          <input
            type="text"
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
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
          />
        </label>
        <label>
          Décrivez les missions et attentes du poste *
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Le poste est-il en télétravail ? *
          <select name="remote" value={formData.remote} onChange={handleChange}>
            <option value="">-- Sélectionnez une option --</option>
            <option value="Présentiel">Présentiel</option>
            <option value="Hybride">Hybride</option>
            <option value="Full remote">Full remote</option>
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
          Quel est le type de contrat que vous proposez ? * lier avec table de
          jointure
          <input
            type="number"
            name="contract_id"
            value={formData.contract_id}
            onChange={handleChange}
          />
        </label>
        <label>
          Ajoutez votre logo d'entreprise *
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
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
        <p>Background par défault : </p>
        <img
          src="/background-default.jpg"
          alt="bureau avec pc portable et lampe"
        />
        <button className="colored-box" type="submit">
          {children}
        </button>
      </form>
    </>
  );
}

export default OfferForm;
