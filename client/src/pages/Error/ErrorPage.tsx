import { Link, useRouteError } from "react-router-dom";
import ErrorImage from "../../components/Error/Error";
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
      <div className="error_image">
        <ErrorImage />
      </div>
      <Link to="/" className="back_to_home">
        <strong>Retour à la page d'accueil</strong>
      </Link>
    </main>
  );
}
