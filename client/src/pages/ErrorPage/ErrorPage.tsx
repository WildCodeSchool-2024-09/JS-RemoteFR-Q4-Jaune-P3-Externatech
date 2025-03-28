import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const typeError = error as {
    status?: number;
    message?: string;
    data?: string;
  };

  const errorMessage = typeError.message || typeError.data;
  const errorCode = typeError.status || 500;

  console.error("Error Code:", errorCode);
  console.error("Error Message:", errorMessage);

  return (
    <main className="error_allpage">
      <h1 className="error_title">Error {errorCode}</h1>
      <strong>
        <p className="error_message">{errorMessage}</p>
      </strong>
      <section className="error_image">
        <div className="space-loader">
          <div id="stars" className="stars" />
          <div className="orbit" />
          <div className="ring" />
          <div className="planet" />
          <div className="satellite" />
        </div>
      </section>
      <Link to="/" className="colored-box">
        <strong>Retour à la page d'accueil</strong>
      </Link>
    </main>
  );
}
