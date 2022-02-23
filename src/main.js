import { createApp } from "vue";
import { createPinia } from "pinia";
import "./app.css";
import App from "./App.vue";
import router from "./routes";

import useAuthStore from "@/stores/auth";

const app = createApp(App);

const pania = createPinia();
app.use(pania);

const auth = useAuthStore();

auth.boot().then(() => {
  app.use(router);
  router.isReady().then(() => {
    app.mount("#app");
  });
});
