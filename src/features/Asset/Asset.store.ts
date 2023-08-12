import { defineStore } from "pinia";
import AssetServices from "./Asset.services";
import { RawAsset, AssetStatistics } from "./Asset.types";
import { RequestStatus } from "@/types/APITypes";
import {
  assetsStatisticsCalculator,
  nestedAssetBuilder,
} from "./Asset.functions";

type State = {
  assetsQuery: RequestStatus<RawAsset[]>;
  statisticsQuery: RequestStatus<AssetStatistics[]>;
  selectedAsset: number | undefined;
};

export const useAssetStore = defineStore("asset", {
  state: (): State => ({
    assetsQuery: { status: "idle" },
    statisticsQuery: { status: "idle" },
    selectedAsset: undefined,
  }),
  getters: {
    assets: (state) => {
      if (state.assetsQuery.status === "success") {
        return nestedAssetBuilder(state.assetsQuery.data);
      }
      return [];
    },
    selectedAssetDetail: (state) => {
      if (state.assetsQuery.status === "success") {
        const foundedAsset = state.assetsQuery.data.find(
          (asset) => asset.id === state.selectedAsset
        );

        return foundedAsset;
      }
    },
    statistics: (state) => {
      if (
        state.statisticsQuery.status === "success" &&
        state.assetsQuery.status === "success" &&
        state.selectedAsset !== undefined
      ) {
        return assetsStatisticsCalculator(
          state.selectedAsset,
          state.assetsQuery.data,
          state.statisticsQuery.data
        );
      }
    },
  },
  actions: {
    setSelectedAsset(id: number) {
      this.selectedAsset = id;
    },
    resetSelectedAsset() {
      this.selectedAsset = undefined;
    },
    async getAssets() {
      try {
        this.assetsQuery = { status: "pending" };
        const result = await AssetServices.getAssets();
        const assets = result.data;
        this.assetsQuery = {
          status: "success",
          data: assets,
        };
      } catch (error) {
        this.assetsQuery = {
          status: "error",
          error,
        };
      }
    },
    async getAssetStatistics() {
      try {
        this.statisticsQuery = { status: "pending" };
        const result = await AssetServices.getAssetsStatistics();
        const assetsStatistics = result.data;
        this.statisticsQuery = {
          status: "success",
          data: assetsStatistics,
        };
      } catch (error) {
        this.statisticsQuery = {
          status: "error",
          error,
        };
      }
    },
  },
});
