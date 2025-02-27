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
  description: string;
  title: string;
  date: string;
  salary: number;
  requirements: string;
  company_id: number;
  company_name: string;
}
interface OfferDataProps {
  offer: OfferData;
}
