import { createRouter, createWebHistory } from "vue-router";
import AssetsLayout from "@/layouts/AssetsLayout.vue";
import AssetStatistic from "@/pages/AssetStatistic.vue";
import AssetsHome from "@/pages/AssetsHome.vue";

const routes = [
  {
    path: "",
    redirect: { name: "assetsHome" },
  },
  {
    path: "/assets",
    name: "assets",
    component: AssetsLayout,
    children: [
      {
        name: "assetsHome",
        path: "home",
        component: AssetsHome,
      },
      {
        name: "assetStatistic",
        path: ":id",
        component: AssetStatistic,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
