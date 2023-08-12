<script setup lang="ts">
import { useAssetStore } from "./Asset.store";
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  SubTitle,
} from "chart.js";
import { Measurements } from "./Asset.types";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  SubTitle
);

const store = useAssetStore();

defineProps<{
  data: Measurements;
}>();

const chartLabels = computed(() =>
  store.statistics
    ? Object.keys(store.statistics).map((date) =>
        new Date(date).toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        })
      )
    : []
);

const chartData = computed(() =>
  store.statistics ? Object.values(store.statistics) : []
);
</script>

<template>
  <Line
    v-if="chartData.length > 0"
    id="statistics-chart"
    :key="store.selectedAsset"
    :data="{
      labels: chartLabels,
      datasets: [
        {
          data: chartData,
        },
      ],
    }"
    :options="{
      color: '#535966',
      backgroundColor: '#535966',
      borderColor: '#e5e5e5',
    }"
  />
  <div v-else class="w-full">There's no data</div>
</template>
