import "./Hero.css";

type HeroProps = {
  stacks: StackType[];
  cities: CityType[];
};

export default function Hero({ stacks, cities }: HeroProps) {
  return (
    <div className="hero-container">
      <h2 className="hero-title">
        Trouvez le <span>PERFECT</span> job
      </h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Recherchez un emploi..."
          className="job-search"
        />
        <select className="filter" name="city" defaultValue="">
          <option value="" hidden>
            Ville
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>

        <select className="filter" name="job-type" defaultValue="">
          <option value="" selected hidden>
            Type de job (CDI, Stage, Alternance)
          </option>
          <option value="option1">CDI</option>
          <option value="option2">CDD</option>
          <option value="option3">Stage</option>
          <option value="option4">Alternance</option>
        </select>

        <select className="filter" name="stack" defaultValue="">
          <option value="" hidden>
            Environnement technique
          </option>
          {stacks.map((stack) => (
            <option key={stack.id} value={stack.name}>
              {stack.name}
            </option>
          ))}
        </select>

        <select className="filter" name="remote">
          <option value="" selected hidden>
            Télétravail
          </option>
          <option value="option1">Inconnu</option>
          <option value="option2">Télétravail complet</option>
          <option value="option3">Télétravail occasionnel</option>
        </select>

        <button type="button" className="search-button">
          Rechercher
        </button>
      </div>
    </div>
  );
}
