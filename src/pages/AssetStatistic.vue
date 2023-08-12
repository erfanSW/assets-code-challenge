<script setup lang="ts">
import { useAssetStore } from "@/features/Asset/Asset.store";
import { computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import AssetStatisticChart from "@/features/Asset/AssetStatisticChart.vue";
import MainContentSkeleton from "@/components/MainContentSkeleton.vue";

const store = useAssetStore();

const route = useRoute();

const id = computed(() => Number(route.params.id));

const selectedAssetDetail = computed(() => store.selectedAssetDetail);

onMounted(async () => {
  store.setSelectedAsset(id.value);
  nextTick();
  await store.getAssetStatistics();
});

const isStatisticsCalculatedByChildren = computed(() => {
  if (store.statisticsQuery.status === "success") {
    const selectedAssetsStatistics = store.statisticsQuery.data.find(
      (statistics) => statistics.assetId === store.selectedAsset
    );

    return selectedAssetsStatistics ? false : true;
  }

  return true;
});
</script>

<template>
  <router-link to="/assets/home">
    <div class="mb-8 text-gray-700 text-sm inline-block">
      <span class="font-extrabold text-xl">&larr;</span> home
    </div>
  </router-link>
  <main-content-skeleton v-if="store.statisticsQuery.status === 'pending'" />
  <div
    v-if="store.statisticsQuery.status === 'success'"
    class="w-full flex flex-col gap-4"
  >
    <h1>{{ selectedAssetDetail?.name }}</h1>
    <p v-if="isStatisticsCalculatedByChildren" class="text-gray-600 text-sm">
      * The asset has no data. Instead the some of its children is used.
    </p>
    <AssetStatisticChart v-if="store.statistics" :data="store.statistics" />
  </div>

  <div
    v-if="store.statisticsQuery.status === 'error'"
    role="alert"
    class="flex flex-col gap-4"
  >
    <span>Server Error!</span>
    <button
      class="bg-orange-200 px-4 py-2 self-start"
      @click="store.getAssetStatistics()"
    >
      try again!
    </button>
  </div>
</template>
