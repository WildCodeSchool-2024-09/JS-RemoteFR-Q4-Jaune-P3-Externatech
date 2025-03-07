import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import "./loginCompany.css";

export default function LoginCompany({ isOpen, onClose }: LoginCompanyProps) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [error, setError] = useState(() => null as string | null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/companies/login`,
          credentials,
          {
            withCredentials: true,
          },
        )

        .then((response) => console.info(response))
        .catch((error) => console.error(error));
    } catch (err) {
      console.error("Request failed:", err);
      setError("Échec de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <dialog open={isOpen}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <p>Mot de passe</p>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button className="colored-box " type="submit">
          Se connecter
        </button>
        <button className="light-box" type="button" onClick={onClose}>
          Annuler
        </button>
        {error ? <p className="messageError">{error} </p> : ""}
      </form>
    </dialog>
  );
}
