import { Asset, RawAsset, AssetStatistics, Measurements } from "./Asset.types";

function nestedAssetBuilder(assets: RawAsset[]) {
  const hierarchyCache = new Map<number, Asset[]>();

  function buildAssetHierarchy(parentId: number | null = null): Asset[] {
    if (parentId !== null && hierarchyCache.has(parentId)) {
      const cachedRecord = hierarchyCache.get(parentId);
      if (cachedRecord) return cachedRecord;
    }

    const children: Asset[] = [];
    for (const asset of assets) {
      if (asset.parentId === parentId) {
        const child: Asset = {
          ...asset,
          children: buildAssetHierarchy(asset.id),
        };
        children.push(child);
      }
    }

    if (parentId !== null) {
      hierarchyCache.set(parentId, children);
    }

    return children;
  }

  return buildAssetHierarchy();
}

function assetsStatisticsCalculator(
  id: number,
  assets: RawAsset[],
  statistics: AssetStatistics[]
): Measurements {
  const selectedAsset = assets.find((a) => a.id === id);

  if (!selectedAsset) {
    return {};
  }

  const selectedAssetStatistics = statistics.find(
    (s) => s.assetId === selectedAsset.id
  );

  if (selectedAssetStatistics) {
    return selectedAssetStatistics.measurements;
  }

  const children = assets.filter((a) => a.parentId === id);

  const aggregatedMeasurements: Measurements = {};

  for (const child of children) {
    const childStatistics = statistics.find((s) => s.assetId === child.id);

    const calculatedStatistics =
      childStatistics?.measurements ??
      assetsStatisticsCalculator(child.id, assets, statistics);

    if (calculatedStatistics) {
      for (const [dateTime, value] of Object.entries(calculatedStatistics)) {
        if (aggregatedMeasurements[dateTime]) {
          aggregatedMeasurements[dateTime] += value;
        } else {
          aggregatedMeasurements[dateTime] = value;
        }
      }
    }
  }

  return aggregatedMeasurements;
}

export { nestedAssetBuilder, assetsStatisticsCalculator };
