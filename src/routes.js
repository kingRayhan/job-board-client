import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Settings from "./pages/Settings.vue";
import useAuthStore from "./stores/auth";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    name: "register",
    path: "/register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta?.auth && !auth.loggedIn) {
    return next("/login");
  }

  if (to.meta?.guest && auth.loggedIn) {
    return next("/");
  }

  next();
});

export default router;
