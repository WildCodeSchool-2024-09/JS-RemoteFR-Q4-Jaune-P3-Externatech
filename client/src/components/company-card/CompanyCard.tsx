import "./company-card.css";

export default function CompanyCard({ company }: CompanyDataProps) {
  return (
    <article className="company-card">
      <h3>{company.name}</h3>
      <img src={`${company.logo}`} alt="" />
    </article>
  );
}
