import type { ReactNode } from "react";

type OfferData = {
  title: string;
  description: string;
  date: string;
  salary: number;
  requirements: string;
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
        const description = offerData.get("description") as string;
        const date = offerData.get("date") as string;
        const salary = Number(offerData.get("salary")) as number;
        const requirements = offerData.get("requirements") as string;
        const company_id = Number(offerData.get("company_id")) as number;
        const contract_id = Number(offerData.get("contract_id")) as number;
        onSubmit({
          title,
          description,
          date,
          salary,
          requirements,
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
        description:
        <input
          type="text"
          name="description"
          defaultValue={defaultValue.description}
        />
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
        l'id de l'entreprise (sera récupéré plus tard)
        <input
          type="text"
          name="company_id"
          defaultValue={defaultValue.company_id}
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
      <button type="submit">{children}</button>
    </form>
  );
}

export default NewOfferForm;
