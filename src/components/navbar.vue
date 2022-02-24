<template>
  <div
    class="flex justify-between max-w-6xl px-2 py-10 mx-auto border-t-4 border-indigo-500 xl:px-0"
  >
    <h2 class="text-2xl font-semibold text-indigo-500">
      <router-link to="/"> JOB Board </router-link>
    </h2>

    <nav v-if="auth.loggedIn" class="flex items-center gap-4">
      <a class="text-base" href="#">My posts</a>
      <router-link class="text-base button" :to="{ name: 'jobs-create' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Post a job</span>
      </router-link>

      <div class="relative flex gap-1">
        <button @click="isOpen = !isOpen">Hi, {{ auth.user.name }}</button>
        <div
          ref="dropdownRef"
          v-if="isOpen"
          class="flex flex-col w-40 items-start bg-white shadow-md rounded-md gap-2 absolute top-[100%] right-0 p-6"
        >
          <router-link :to="{ name: 'settings' }">Settings</router-link>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <nav v-else class="flex items-center gap-4">
      <router-link class="text-base" :to="{ name: 'login' }">Login</router-link>
      <router-link class="text-base button" :to="{ name: 'register' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Join</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/auth";
import { onClickOutside } from "@vueuse/core";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
const isOpen = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const logout = () => {
  auth
    .logout()
    .then(() => {
      router.push({ name: "login" });
    })
    .catch(() => {
      alert("Something went wrong");
    });
};
</script>
