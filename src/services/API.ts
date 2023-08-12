import axios from "axios";
import { initializeAxiosMockAdapter } from "./__mocks/MockAdapter";

const baseURL = "https://example.url";
const isMockEnabled = true;

const axiosInstance = axios.create({ baseURL });

if (isMockEnabled) {
  initializeAxiosMockAdapter(axiosInstance);
}

export default axiosInstance;
