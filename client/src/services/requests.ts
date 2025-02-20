import axios from "axios";
const getCompany = (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/companies/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export { getCompany };
