import axios from "axios";
import NewOfferForm from "./NewOfferForm";

function CompanyDashboard() {
  const newOffer = {
    title: "",
    description: "",
    date: "",
    salary: 0,
    requirements: "",
    company_id: 0,
    contract_id: 0,
  };

  return (
    <NewOfferForm
      defaultValue={newOffer}
      onSubmit={(offerData) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/api/offers`, offerData)
          .catch((error) => {
            console.error("Erreur lors de l'ajout de l'offre :", error);
          });
      }}
    >
      Ajouter
    </NewOfferForm>
  );
}

export default CompanyDashboard;
