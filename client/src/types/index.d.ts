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

interface StackData {
  name: string;
  id: number;
}

interface CityData {
  city: string;
  id: number;
}

interface ContractData {
  id: number;
  name: string;
}

interface Work_conditionData {
  id: number;
  name: string;
}

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
  work_condition_name: string;
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
  work_condition_id: number;
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
type LoginCompanyProps = {
  isOpen: boolean;
  onClose: () => void;
};
type HeroProps = {
  stacks: StackData[];
  cities: CityData[];
  work_conditions: work_conditionData[];
  contracts: ContractData[];
};
