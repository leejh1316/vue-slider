import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import App from "@/App.vue";
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: __BASE_URL__,
    component: App,
  },
];
const router = createRouter({
  history: createWebHistory(__BASE_URL__),
  routes,
});

export { router };
