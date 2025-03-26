import "./offerForm.css";
import { useEffect, useState } from "react";

function OfferForm({
  children,
  value,
  errorMessage,
  onSubmit,
}: OfferFormProps) {
  const [formData, setFormData] = useState(value);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (errorMessage === "") {
      setFormData(value);
    }
  }, [errorMessage, value]);

  const maxLengths = {
    title: 250,
    city: 250,
  };

  return (
    <>
      <form className="form-offer" onSubmit={handleSubmit}>
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
          <textarea
            name="profile"
            value={formData.profile}
            onChange={handleChange}
          />
        </label>
        <label>
          Décrivez les missions et attentes du poste *
          <textarea
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
          {children}
        </button>
      </form>
    </>
  );
}

export default OfferForm;
