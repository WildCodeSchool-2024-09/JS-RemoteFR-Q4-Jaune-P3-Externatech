import "./Forbidden.css";
import ErrorImage from "../../../components/Error/Error";

export default function Forbidden() {
  return (
    <>
      <main className="error_allpage">
        <h1>Accès interdit</h1>
        <ErrorImage />
      </main>
    </>
  );
}
