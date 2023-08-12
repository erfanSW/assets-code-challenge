import { describe, it, expect } from "vitest";
import { nestedAssetBuilder } from "./Asset.functions";
import { Asset, RawAsset } from "./Asset.types";

describe("nestedAssetBuilder", () => {
  it("should construct a simple nested asset hierarchy", () => {
    const rawAssets = [
      { id: 1, name: "Parent", parentId: null },
      { id: 2, name: "Child", parentId: 1 },
    ];

    const result = nestedAssetBuilder(rawAssets);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should build complex asset hierarchy", () => {
    const rawAssets: RawAsset[] = [
      { id: 1, parentId: null, name: "Asset 1" },
      { id: 2, parentId: 1, name: "Asset 2" },
      { id: 3, parentId: 1, name: "Asset 3" },
      { id: 4, parentId: 2, name: "Asset 4" },
      { id: 5, parentId: 4, name: "Asset 5" },
    ];
    const expectedHierarchy: Asset[] = [
      {
        id: 1,
        parentId: null,
        name: "Asset 1",
        children: [
          {
            id: 2,
            parentId: 1,
            name: "Asset 2",
            children: [
              {
                id: 4,
                parentId: 2,
                name: "Asset 4",
                children: [
                  {
                    id: 5,
                    parentId: 4,
                    name: "Asset 5",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            parentId: 1,
            name: "Asset 3",
            children: [],
          },
        ],
      },
    ];

    const result = nestedAssetBuilder(rawAssets);
    expect(result).toEqual(expectedHierarchy);
  });
});
