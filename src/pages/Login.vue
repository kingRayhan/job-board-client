<template>
  <form
    action="#"
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start gap-4 p-3 mx-auto md:w-6/12"
  >
    <h1 class="text-xl font-semibold text-slate-700">Login</h1>

    <Input
      name="email"
      type="email"
      v-model="form.email"
      :helperText="getErrorMessage('email')"
      :hasError="Boolean(getErrorMessage('email'))"
    />
    <Input
      name="password"
      type="password"
      v-model="form.password"
      :helperText="getErrorMessage('password')"
      :hasError="Boolean(getErrorMessage('password'))"
    />

    <AppButton :loading="loading">Login</AppButton>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import useForm from "@/hooks/useForm";
import { reactive } from "vue";

import Input from "@/components/Form/Input.vue";
import AppButton from "@/components/Form/AppButton.vue";

import useAuthStore from "@/stores/auth";
import useTokenStore from "@/stores/token";
import api from "@/lib/api";

const router = useRouter();

const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const { submit, getErrorMessage, loading } = useForm();

const token = useTokenStore();

const handleSubmit = () => {
  submit(form, "/api/auth/login").then(async ({ token }) => {
    localStorage.setItem("token", token);
    api.setHeader("Authorization", `Bearer ${token}`);
    await auth.boot();

    router.push({ name: "home" });
  });
};
</script>
