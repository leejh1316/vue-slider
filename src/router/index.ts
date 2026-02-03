import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import App from "@/App.vue";
const BASE_URL = "/";
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: BASE_URL,
    component: App,
  },
];
const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export { router };
