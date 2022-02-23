import api from "@/lib/api";
import { defineStore } from "pinia";
import useTokenStore from "./token";

const useAuthStore = defineStore("auth", {
  state() {
    return {
      user: {},
      loggedIn: false,
    };
  },
  actions: {
    async boot() {
      return new Promise(async (resolve, reject) => {
        const { ok, data } = await api.get("/api/auth/me");
        if (ok) {
          this.loggedIn = true;
          this.user = data;
        }
        resolve();
      });
    },
    logout() {
      return new Promise(async (resolve, reject) => {
        const { ok } = await api.post("/api/auth/logout");
        if (ok) {
          this.loggedIn = false;
          this.user = {};
          localStorage.removeItem("token");
          resolve(true);
        } else {
          reject(true);
        }
      });
    },
  },
});

export default useAuthStore;
