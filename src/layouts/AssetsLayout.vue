<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useAssetStore } from "@/features/Asset/Asset.store";
import AssetTreeView from "@/features/Asset/AssetTreeView.vue";

const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const assetsStore = useAssetStore();

const assetsQuery = computed(() => assetsStore.assetsQuery);
const assets = computed(() => assetsStore.assets);

onMounted(async () => await assetsStore.getAssets());

watch(
  () => assetsStore.selectedAsset,
  () => {
    if (isSidebarVisible.value) isSidebarVisible.value = false;
  }
);
</script>

<template>
  <header class="bg-slate-700 text-white shadow-xl flex gap-4 items-center p-2 lg:p-4">
    <button
      class="rounded border border-gray-4 px-2 py-1 text-sm lg:hidden"
      @click="toggleSidebar"
    >
      open menu &rarr;
    </button>
    <h1 class="text-sm lg:text-base">Front-End Assignment</h1>
  </header>
  <div class="flex flex-col lg:flex-row">
    <aside
      class="fixed top-0 w-72 flex flex-col gap-1 p-4 justify-start bg-gray-100 h-screen overflow-auto lg:static z-10"
      :class="{ 'hidden lg:flex': !isSidebarVisible }"
    >
      <button
        class="rounded border border-gray-4 px-2 py-1 text-sm lg:hidden"
        @click="toggleSidebar"
      >
        &larr; hide menu
      </button>
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
    </aside>
    <main class="flex-1 px-6 py-5 lg:px-28">
      <router-view />
    </main>
  </div>
</template>
