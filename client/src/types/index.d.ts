interface CompanyData {
  id: number;
  name: string;
  logo: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  size: string;
  website: string;
  siret: string;
}

interface LanguageType {
  name: string;
  id: number;
}

interface ContractType {
  id: number;
  name: string;
}

// interface OfferData {
//   id: number;
//   title: string;
//   city: string;
//   logo: string;
//   background: string;
//   description: string;
//   salary: number;
//   profile: string;
//   remote: string;
//   company_id: number;
//   contract_id: number;
//   company_name: string;
//   contract_name: string;
// }

// interface OfferTypes {
interface OfferData {
  id: number;
  title: string;
  city: string;
  company_logo: string;
  background: string;
  offer_description: string;
  salary: number;
  profile: string;
  company_id: number;
  contract_id: number;
  contract_name: string;
  remote_name: string;
  company_name: string;
  company_description: string;
  stack_names: string;
}

interface OfferDataForm {
  title: string;
  city: string;
  background: string;
  description: string;
  salary: number;
  profile: string;
  remote_id: number;
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
