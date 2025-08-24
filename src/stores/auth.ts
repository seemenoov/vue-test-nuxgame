import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false as boolean,
  }),
  actions: {
    login(): void {
      this.isAuthenticated = true;
    },
  },
});
