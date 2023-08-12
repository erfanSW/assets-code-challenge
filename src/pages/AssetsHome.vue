<script setup lang="ts">
import { useAssetStore } from "@/features/Asset/Asset.store";
import MainContentSkeleton from "@/components/MainContentSkeleton.vue";
import { onMounted } from "vue";

const assetsStore = useAssetStore();

onMounted(() => {
  assetsStore.resetSelectedAsset();
});
</script>

<template>
  <section class="flex flex-col mt-10 gap-6">
    <main-content-skeleton
      v-if="assetsStore.assetsQuery.status === 'pending'"
    />
    <template v-if="assetsStore.assetsQuery.status === 'success'">
      <h1 class="text-center text-lg font-bold">Select one:</h1>
      <div class="flex items flex-wrap justify-center gap-10">
        <router-link
          v-for="asset in assetsStore.assetsQuery.data"
          :key="asset.id"
          :to="'/assets/' + asset.id"
        >
          <article class="px-4 py-2 rounded bg-neutral-100">
            {{ asset.name }}
          </article>
        </router-link>
      </div>
    </template>
  </section>
</template>
