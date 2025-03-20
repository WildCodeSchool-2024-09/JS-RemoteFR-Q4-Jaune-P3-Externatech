import "./LegalInformations.css";

export default function LegalInformations() {
  return (
    <>
      <h2 className="titleMl">Mentions légales</h2>
      <article className="articleMl">
        <h3 className="titleMlh3">Éditeur du site </h3>
        <div className="Bar-Legal" />
        <p className="Team-Legal">
          Ce site est un projet développé par
          <ul className="List-Legal">
            <li>Clarelle</li>
            <li>Duncan</li>
            <li>Julian</li>
            <li>Maxime</li>
            <li>Mounir</li>
            <li>Victoria</li>
          </ul>
        </p>
        <h3 className="titleMlh3">Responsabilité</h3>
        <div className="Bar-Legal" />
        <p>Les informations fournies sur ce site le sont à titre indicatif. </p>
      </article>
    </>
  );
}
