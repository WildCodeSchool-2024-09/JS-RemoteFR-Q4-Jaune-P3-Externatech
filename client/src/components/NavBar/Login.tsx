import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ isOpen, onClose }: LoginCompanyProps) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [error, setError] = useState(() => null as string | null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        credentials,
        { withCredentials: true },
      );

      console.info(response.data);
      onClose();
      navigate("/companies/dashboard");
    } catch (err) {
      console.error("Request failed:", err);
      setError("Échec de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <dialog className="dialog_login" open={isOpen}>
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
        <div className="login_buttons">
          <button className="colored-box " type="submit">
            Se connecter
          </button>
          <button className="light-box" type="button" onClick={onClose}>
            Annuler
          </button>
        </div>
        {error ? <p className="messageError">{error} </p> : ""}
      </form>
    </dialog>
  );
}
