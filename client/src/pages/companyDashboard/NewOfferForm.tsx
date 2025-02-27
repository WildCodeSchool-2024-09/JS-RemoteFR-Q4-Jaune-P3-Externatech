import type { ReactNode } from "react";

type OfferData = {
  title: string;
  city: string;
  logo: string;
  background: string;
  description: string;
  date: string;
  salary: number;
  skills: string;
  requirements: string;
  remote: string;
  company_id: number;
  contract_id: number;
};

interface OfferFormProps {
  children: ReactNode;
  defaultValue: OfferData;
  onSubmit: (offer: OfferData) => void;
}

function NewOfferForm({ children, defaultValue, onSubmit }: OfferFormProps) {
  return (
    <form
      className="form-offer"
      onSubmit={(event) => {
        event.preventDefault();

        const offerData = new FormData(event.currentTarget);

        const title = offerData.get("title") as string;
        const city = offerData.get("city") as string;
        const logo = offerData.get("logo") as string;
        const background = offerData.get("background") as string;
        const skills = offerData.get("skills") as string;
        const description = offerData.get("description") as string;
        const date = offerData.get("date") as string;
        const salary = Number(offerData.get("salary")) as number;
        const requirements = offerData.get("requirements") as string;
        const remote = offerData.get("remote") as string;
        const company_id = defaultValue.company_id;
        const contract_id = Number(offerData.get("contract_id")) as number;
        onSubmit({
          title,
          city,
          logo,
          background,
          description,
          date,
          salary,
          skills,
          requirements,
          remote,
          company_id,
          contract_id,
        });
      }}
    >
      <label>
        Titre:
        <input type="text" name="title" defaultValue={defaultValue.title} />
      </label>
      <label>
        Ville:
        <input type="text" name="city" defaultValue={defaultValue.city} />
      </label>

      <label>
        skills:
        <input type="text" name="skills" defaultValue={defaultValue.skills} />
      </label>
      <label>
        description:
        <input
          type="text"
          name="description"
          defaultValue={defaultValue.description}
        />
      </label>
      <label>
        remote:
        <input type="text" name="remote" defaultValue={defaultValue.remote} />
      </label>
      <label>
        date :
        <input
          type="date"
          name="date"
          defaultValue={defaultValue.date}
          required
        />
      </label>
      <label>
        salaire:
        <input type="text" name="salary" defaultValue={defaultValue.salary} />
      </label>
      <label>
        Exigences du poste:
        <input
          type="text"
          name="requirements"
          defaultValue={defaultValue.requirements}
        />
      </label>
      <label>
        l'id du contrat (sera récupéré plus tard)
        <input
          type="text"
          name="contract_id"
          defaultValue={defaultValue.contract_id}
        />
      </label>
      <label>
        logo :
        <input type="text" name="logo" defaultValue={defaultValue.logo} />
      </label>
      <label>
        background :
        <input
          type="text"
          name="background"
          defaultValue={defaultValue.background}
        />
      </label>
      <button type="submit">{children}</button>
    </form>
  );
}

export default NewOfferForm;
