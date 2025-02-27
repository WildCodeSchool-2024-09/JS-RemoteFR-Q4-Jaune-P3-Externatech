import { useState } from "react";
function NewOfferForm({ children, value, onSubmit }: OfferFormProps) {
  const [formData, setFormData] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <form
      className="form-offer"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      <label>
        Titre:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Ville:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        profile recherché:
        <input
          type="text"
          name="profile"
          value={formData.profile}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Remote:
        <input
          type="text"
          name="remote"
          value={formData.remote}
          onChange={handleChange}
        />
      </label>
      <label>
        Salaire:
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </label>
      <label>
        ID du contrat (sera récupéré plus tard):
        <input
          type="text"
          name="contract_id"
          value={formData.contract_id}
          onChange={handleChange}
        />
      </label>
      <label>
        Logo:
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
        />
      </label>
      <label>
        Background:
        <input
          type="text"
          name="background"
          value={formData.background}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{children}</button>
    </form>
  );
}

export default NewOfferForm;
