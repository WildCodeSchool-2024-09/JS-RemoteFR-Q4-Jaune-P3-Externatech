import axios from "axios";

const getAllCompanies = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

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

const getWorkCondition = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/work_condition_options`)
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

const getCandidatesByCompany = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/candidates_offers`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getApplyByCandidate = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/candidates_offers/candidates`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getAllCompanies,
  getContracts,
  getOfferDetails,
  getCompanyAuth,
  getOffersByCompany,
  getCompanies,
  getWorkCondition,
  getStacks,
  getCities,
  getAllOffers,
  getCandidatesByCompany,
  getApplyByCandidate,
};
