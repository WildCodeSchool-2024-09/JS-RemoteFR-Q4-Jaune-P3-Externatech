import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <img src="./Logo-app.png" alt="" />
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/">Espace entreprise</Link>
          </li>
          <li>
            <Link to="/">Nous contacter</Link>
          </li>
        </ul>
        <div />
        <ul>
          <li>
            <Link to="/">Conditions générales</Link>
          </li>
          <li>
            <Link to="/">Mentions légales</Link>
          </li>
          <li>
            <Link to="/">Politique de protection des données</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
