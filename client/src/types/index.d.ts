interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
}

interface CandidateOfferData {
  id: number;
  candidate_id: number;
  offer_id: number;
  candidate_firstname: string;
  candidate_lastname: string;
  candidate_email: string;
  company_id: number;
  offer_title: string;
  status: string;
}

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
  updated_at: string;
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
  description: string;
  salary: number;
  profile: string;
  company_id: number;
  contract_id: number;
  contract_name: string;
  work_condition_name: string;
  work_condition_id?: number;
  company_name: string;
  company_description: string;
  stack_names: string;
  stack_ids: string;
  status: string;
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
  stacks: number[];
}

interface OfferDataProps {
  offer: OfferData;
  editable: boolean;
}
interface CompanyDataProps {
  company: CompanyData;
}

interface OfferFormProps {
  children: ReactNode;
  value: OfferDataForm;
  stacks: StackData[];
  errorMessage: string;
  onSubmit: (offer: OfferDataForm) => void;
}

type LoginCompanyProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface SvgTypes {
  path: string;
  width: string;
  height: string;
}

interface HeroProps {
  cities: CityData[];
  contracts: ContractData[];
  onSearch: (filters: FilterValues) => void;
  stacks: StackData[];
  work_conditions: Work_conditionData[];
}

interface CandidateOfferProps {
  candidateOffer: Candidate_ByCompanyData;
}

interface FilterValues {
  keyword: string;
  city: string;
  contract: string;
  stack: string;
  remote: string;
}
