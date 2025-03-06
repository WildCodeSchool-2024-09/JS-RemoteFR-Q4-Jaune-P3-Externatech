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

interface StackType {
  name: string;
  id: number;
}

interface CityType {
  city: string;
  id: number;
}

interface ContractType {
  id: number;
  name: string;
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

interface OfferDataProps {
  offer: OfferData;
}

interface OfferFormProps {
  children: ReactNode;
  value: OfferData;
  onSubmit: (offer: OfferData) => void;
}
