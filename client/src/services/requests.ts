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

const getOffersByCompany = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/offers/companies`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompanyAuth = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/authcompany`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCompanies = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getContracts = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/contracts`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getRemoteOptions = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/remote_options`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getStacks = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/stacks`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCities = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/cities`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getContracts,
  getOfferDetails,
  getCompanyAuth,
  getOffersByCompany,
  getCompanies,
  getRemoteOptions,
  getStacks,
  getCities,
  getAllOffers,
};
