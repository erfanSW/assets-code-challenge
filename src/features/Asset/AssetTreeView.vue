<script lang="ts" setup>
import { Asset } from "./Asset.types";
import { useAssetStore } from "./Asset.store";
import { useRouter } from "vue-router";

defineProps<{ asset: Asset }>();

const router = useRouter();
const assetsStore = useAssetStore();

function handleSelect(id: number) {
  assetsStore.setSelectedAsset(id);
  router.push({ path: "/assets/" + id });
}
</script>

<template name="asset-tree-view">
  <div
    v-if="asset.children.length === 0"
    tabindex="0"
    class="pl-2 py-2 text-gray-800 cursor-pointer"
    :class="{
      'bg-neutral-200 rounded': assetsStore.selectedAsset === asset.id,
    }"
    @click="handleSelect(asset.id)"
    @keyup.enter.space="handleSelect(asset.id)"
  >
    {{ asset.name }}
  </div>

  <details
    v-else
    class="flex items-center gap-1 text-gray-800"
    :open="
      assetsStore.selectedAsset !== undefined &&
      assetsStore.selectedAsset >= asset.id
    "
  >
    <summary
      class="pl-2 py-2 text-gray-500 select-none text-md"
      :class="{
        'bg-neutral-200 rounded': assetsStore.selectedAsset === asset.id,
      }"
    >
      <span
        class="text-gray-800 text-base cursor-pointer"
        @click.prevent="handleSelect(asset.id)"
        >{{ asset.name }}</span
      >
    </summary>
    <asset-tree-view
      v-for="child in asset.children"
      :key="child.id"
      :asset="child"
      class="ml-4"
    />
  </details>
</template>
