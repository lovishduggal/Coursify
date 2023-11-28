import axios from 'axios';

const Base_URL = 'https://backend-lovishduggal.vercel.app/api/v1';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = Base_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
