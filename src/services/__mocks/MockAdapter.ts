import MockAdapter from "axios-mock-adapter";
import { AxiosInstance } from "axios";
import { GET_ASSETS, GET_ASSET_STATISTICS } from "../APIPaths";
import { assets, assetsStatistics } from "./assetsData";

export const initializeAxiosMockAdapter = (instance: AxiosInstance) => {
  const mock = new MockAdapter(instance, {
    delayResponse: 2000,
    onNoMatch: "throwException",
  });
  mock.onGet(GET_ASSETS).reply(() => [200, assets]);
  mock.onGet(GET_ASSET_STATISTICS).reply(() => [200, assetsStatistics]);
};
