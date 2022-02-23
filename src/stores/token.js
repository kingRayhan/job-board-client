import { defineStore } from "pinia";

const useTokenStore = defineStore("tokens", {
  state() {
    return {
      tokens: {},
    };
  },
  getters: {
    getToken() {
      return (key) => this.tokens[key];
    },
  },
  actions: {
    storeToken({ name, token }) {
      this.tokens[name] = token;
      localStorage.setItem(name, token);
    },
    deleteToken({ name }) {
      delete this.tokens[name];
      localStorage.removeItem(name);
    },
  },
});

export default useTokenStore;
