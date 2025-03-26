import "./ErrorPage.css";

import ErrorImage from "../../components/Error/Error";

export default function ErrorPage() {
  return (
    <>
      <main className="error_allpage">
        <h1 className="error_title">Error</h1>
        <div className="error_image">
          <ErrorImage />
        </div>
      </main>
    </>
  );
}
