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

interface OfferData {
  id: number;
  title: string;
  city: string;
  logo: string;
  background: string;
  description: string;
  salary: number;
  profile: string;
  remote: string;
  company_id: number;
  contract_id: number;
  company_name: string;
  contract_name: string;
}

interface OfferDataForm {
  title: string;
  city: string;
  logo: string;
  background: string;
  description: string;
  salary: number;
  profile: string;
  remote: string;
  company_id: number;
  contract_id: number;
}

interface OfferDataProps {
  offer: OfferData;
}

interface OfferFormProps {
  children: ReactNode;
  value: OfferDataForm;
  onSubmit: (offer: OfferDataForm) => void;
}
