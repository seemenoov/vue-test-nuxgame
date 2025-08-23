import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Info from "@/views/Info.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: "login" } },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/info",
      name: "info",
      component: Info,
    },
  ],
});

export default router;
