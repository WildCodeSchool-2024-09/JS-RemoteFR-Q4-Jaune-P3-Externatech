import "./Hero.css";

export default function Hero({
  stacks,
  cities,
  work_conditions,
  contracts,
}: HeroProps) {
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
          {contracts.map((contract) => (
            <option key={contract.id} value={contract.name}>
              {contract.name}
            </option>
          ))}
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
          {work_conditions.map((work_condition) => (
            <option key={work_condition.id} value={work_condition.name}>
              {work_condition.name}
            </option>
          ))}
        </select>

        <button type="button" className="search-button">
          Rechercher
        </button>
      </div>
    </div>
  );
}
