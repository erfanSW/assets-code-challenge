import { AxiosPromise } from "axios";
import API from "@/services/API";
import { GET_ASSETS, GET_ASSET_STATISTICS } from "@/services/APIPaths";
import { RawAsset, AssetStatistics } from "./Asset.types";

const AssetServices = {
  getAssets(): AxiosPromise<RawAsset[]> {
    return API.get(GET_ASSETS);
  },
  getAssetsStatistics(): AxiosPromise<AssetStatistics[]> {
    return API.get(GET_ASSET_STATISTICS);
  },
};

export default AssetServices;
