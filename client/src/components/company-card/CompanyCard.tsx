import "./company-card.css";

export default function CompanyCard({ company }: CompanyDataProps) {
  return (
    <article className="company-card">
      <h3>{company.name}</h3>
      <img
        src={`${import.meta.env.VITE_API_URL}/uploads/logo/${company.logo}`}
        alt=""
      />
    </article>
  );
}
