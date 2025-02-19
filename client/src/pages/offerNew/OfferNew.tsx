import OfferForm from "../../components/OfferForm";

function OfferNew() {
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
    <>
      <OfferForm
        defaultValue={newOffer}
        onSubmit={(OfferData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/offers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(OfferData),
          }).then((response) => response.json());
        }}
      >
        Ajouter
      </OfferForm>
    </>
  );
}

export default OfferNew;
