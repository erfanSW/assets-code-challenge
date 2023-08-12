type Asset = {
  id: number;
  name: string;
  parentId: number | null;
  children: Asset[];
};

type RawAsset = Omit<Asset, "children">;

type Measurements = Record<string, number>;

type AssetStatistics = {
  assetId: number;
  measurements: Measurements;
};

export type { Asset, RawAsset, AssetStatistics, Measurements };
