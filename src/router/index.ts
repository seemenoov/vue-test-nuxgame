import { createRouter, createWebHistory } from "vue-router";

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
      beforeEnter: (to, from) => {
        if (!to.query?.id) {
          router.push("/login");
        }
      },
    },
  ],
});

export default router;
