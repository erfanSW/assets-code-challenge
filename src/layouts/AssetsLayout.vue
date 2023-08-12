<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAssetStore } from "@/features/Asset/Asset.store";
import AssetTreeView from "@/features/Asset/AssetTreeView.vue";

const assetsStore = useAssetStore();

const assetsQuery = computed(() => assetsStore.assetsQuery);
const assets = computed(() => assetsStore.assets);

onMounted(async () => await assetsStore.getAssets());
</script>

<template>
  <nav class="bg-slate-700 text-white shadow-xl flex p-4">
    Front-End Assignment
  </nav>
  <div class="flex">
    <div
      class="w-72 flex flex-col gap-1 p-4 justify-start bg-gray-100 h-screen overflow-auto"
    >
      <ul v-if="assetsQuery.status === 'pending'" class="flex flex-col gap-1">
        <li
          v-for="i in 10"
          :key="i"
          class="w-full h-10 animate-skeleton bg-neutral-200 rounded"
        ></li>
      </ul>
      <template v-if="assetsQuery.status === 'success'">
        <asset-tree-view
          v-for="asset in assets"
          :key="asset.id"
          :asset="asset"
        />
      </template>
      <div
        v-if="assetsQuery.status === 'error'"
        role="alert"
        class="flex flex-col gap-4"
      >
        <span>Server Error!</span>
        <button class="bg-orange-200 p-2" @click="assetsStore.getAssets()">
          try again!
        </button>
      </div>
    </div>
    <main class="flex-1 px-28 py-5">
      <router-view />
    </main>
  </div>
</template>
