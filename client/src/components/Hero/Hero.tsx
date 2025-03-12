import { useState } from "react";
import "./Hero.css";

interface HeroProps {
  stacks: StackData[];
  cities: CityData[];
  work_conditions: Work_conditionData[];
  contracts: ContractData[];
  onSearch: (filters: FilterValues) => void;
}

export default function Hero({
  stacks,
  cities,
  work_conditions,
  contracts,
  onSearch,
}: HeroProps) {
  const [filters, setFilters] = useState<FilterValues>({
    keyword: "",
    city: "",
    contract: "",
    stack: "",
    remote: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="hero-container">
      <h2 className="hero-title">
        Trouvez le <span>PERFECT</span> job
      </h2>
      <div className="search-container">
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Recherchez un emploi..."
          className="job-search"
        />
        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="filter"
        >
          <option value="">Ville</option>
          {[...new Map(cities.map((city) => [city.city, city])).values()].map(
            (city) => (
              <option key={city.id} value={city.city}>
                {city.city}
              </option>
            ),
          )}
        </select>

        <select
          name="contract"
          value={filters.contract}
          onChange={handleChange}
          className="filter"
        >
          <option value="">Type de job (CDI, Stage, Alternance)</option>
          {contracts.map((contract) => (
            <option key={contract.id} value={contract.name}>
              {contract.name}
            </option>
          ))}
        </select>

        <select
          name="stack"
          value={filters.stack}
          onChange={handleChange}
          className="filter"
        >
          <option value="">Environnement technique</option>
          {stacks.map((stack) => (
            <option key={stack.id} value={stack.name}>
              {stack.name}
            </option>
          ))}
        </select>

        <select
          name="remote"
          value={filters.remote}
          onChange={handleChange}
          className="filter"
        >
          <option value="">Télétravail</option>
          {work_conditions.map((work_condition) => (
            <option key={work_condition.id} value={work_condition.name}>
              {work_condition.name}
            </option>
          ))}
        </select>

        <button type="button" className="search-button" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
    </div>
  );
}
