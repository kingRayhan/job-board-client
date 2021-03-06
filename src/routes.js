import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import Settings from "./pages/Settings.vue";

import JobLayout from "./components/jobs-layout.vue";
import CreateJob from "./pages/jobs/create.vue";
import UpdateJob from "./pages/jobs/update.vue";
import JobDetails from "./pages/jobs/details.vue";
import MyPosts from "./pages/jobs/mine.vue";
import JobsWithTags from "./pages/jobs/tag.vue";

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
  {
    path: "/jobs",
    component: JobLayout,
    children: [
      {
        name: "jobs-mine",
        path: "mine",
        component: MyPosts,
        meta: { auth: true },
      },
      {
        name: "jobs-create",
        path: "create",
        component: CreateJob,
        meta: { auth: true },
      },
      {
        name: "jobs-update",
        path: "update/:slug",
        component: UpdateJob,
        meta: { auth: true },
      },
      {
        name: "jobs-with-tags",
        path: "tag/:slug",
        component: JobsWithTags,
      },
      {
        name: "jobs-details",
        path: ":slug",
        component: JobDetails,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
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
