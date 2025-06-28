import axios from "axios";

const baseUrl = "/api/coins";

const getCoins = ({ page, limit }) => {
  return axios
    .get(`${baseUrl}/markets?page=${page}&per_page=${limit}`)
    .then((response) => response.data);
};

const getCoinById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getCoins,
  getCoinById,
};
