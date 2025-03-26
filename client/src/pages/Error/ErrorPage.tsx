import { useLocation } from "react-router-dom";
import ErrorImage from "../../components/Error/Error";
import "./ErrorPage.css";

export default function ErrorPage() {
  const location = useLocation();
  const { errorMessage, errorCode } = location.state || {
    errorMessage: "An unexpected error occurred.",
    errorCode: 500,
  };

  return (
    <main className="error_allpage">
      <h1 className="error_title">Error {errorCode}</h1>
      <strong>
        <p className="error_message">{errorMessage}</p>
      </strong>
      <div className="error_image">
        <ErrorImage />
      </div>
    </main>
  );
}
