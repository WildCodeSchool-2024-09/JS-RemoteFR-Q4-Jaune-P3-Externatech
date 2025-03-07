import type { FormEventHandler } from "react";
import { useRef, useState } from "react";
import "./loginCompany.css";

export default function LoginCompany({ isOpen, onClose }: LoginCompanyProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(() => null as string | null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);

    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (response.ok) {
        onClose();
      } else {
        setError("Échec de connexion. Vérifier vos identifiants ");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <dialog ref={dialogRef} open={isOpen}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Email</p>
        <input type="email" ref={emailRef} required />
        <p>Mot de passe</p>
        <input type="password" ref={passwordRef} required />
        <button className="colored-box " type="submit">
          Se connecter
        </button>
        <button className="light-box" type="button" onClick={onClose}>
          Annuler
        </button>
        {error ? <p>{error} </p> : ""}
      </form>
    </dialog>
  );
}
