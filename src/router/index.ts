import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: "login" } },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("@/pages/Info.vue"),
      beforeEnter: (_to, from) => {
        if (!_to.query?.id || !useAuthStore().isAuthenticated) {
          return { name: "login" };
        }
      },
    },
  ],
});

export default router;
