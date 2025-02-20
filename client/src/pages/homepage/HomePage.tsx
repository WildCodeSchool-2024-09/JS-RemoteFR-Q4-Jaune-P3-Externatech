import "./homePage.css";

export default function HomePage() {
  return (
    <>
      <header className="headerHomepage">
        <div id="infoHeader">
          <h1>Ton future au bout du clavier</h1>
          <p>Plus de 666 raisons de nous rejoindre</p>
          <input type="text" />
          <button type="button">Trouver un job</button>
        </div>
      </header>
      <section>
        <h2>Nos dernières OFFRES</h2>
        <div className="gradientBar"> </div>
        <div> </div>
      </section>
      <section className="greyBlock">
        <h2>Pourquoi nous REJOINDRE</h2>
        <button type="button">QU'ATTENDEZ-VOUS ?</button>
      </section>
      <section>
        <h2>Ils nous font CONFIANCE</h2>
        <div className="gradientBar"> </div>
        <div> </div>
      </section>
    </>
  );
}
