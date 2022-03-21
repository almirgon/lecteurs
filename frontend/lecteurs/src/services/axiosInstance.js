import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lecteurs-api.herokuapp.com",
});

export default axiosInstance;
