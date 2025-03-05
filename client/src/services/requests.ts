import axios from "axios";

const getAllOffers = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/offers`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getOfferDetails = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/offers/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getOffersByCompany = (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/offers/companies/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompany = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompanies = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getOfferDetails,
  getOffersByCompany,
  getCompanies,
  getCompany,
  getAllOffers,
};
