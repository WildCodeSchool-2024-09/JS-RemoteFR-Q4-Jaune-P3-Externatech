import "./Error404.css";

import ErrorImage from "../../../components/Error/Error";

export default function Error404() {
  return (
    <>
      <main className="error_allpage">
        <h1 className="error_title">Error 404</h1>
        <div className="error_image">
          <ErrorImage />
        </div>
      </main>
    </>
  );
}
