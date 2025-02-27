interface CompanyData {
  id: number;
  name: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  size: string;
  website: string;
  siret: string;
}

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
  value: OfferData;
  onSubmit: (offer: OfferData) => void;
}
