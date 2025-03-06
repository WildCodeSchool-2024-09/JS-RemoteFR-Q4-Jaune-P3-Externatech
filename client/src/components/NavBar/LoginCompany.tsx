import type { FormEventHandler } from "react";
import { useEffect, useRef } from "react";
import "./loginCompany.css";
export default function LoginCompany({ isOpen, onClose }: LoginCompanyProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // const closeDialog = () => {
  //   dialogRef.current?.close();
  //   document.body.style.overflow = "";
  // };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.status === 200) {
        console.info("good");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      if (isOpen) {
        modal.style.display = "block";
      } else {
        modal.style.display = "none";
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} open={isOpen}>
      <form onSubmit={handleSubmit}>
        <p> email </p>
        <input type="email" ref={emailRef} required />
        <p>mot de passe</p>
        <input type="password" ref={passwordRef} required />
        <button type="submit">se connecter</button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </form>
    </dialog>
  );
}
