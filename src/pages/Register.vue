<template>
  <form
    action="#"
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start w-6/12 gap-4 mx-auto"
  >
    <h1 class="text-xl font-semibold text-slate-700">Register</h1>
    <Input
      name="name"
      type="text"
      v-model="form.name"
      :helperText="getErrorMessage('name')"
      :hasError="Boolean(getErrorMessage('name'))"
    />
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
    <Input
      name="Confirm Password"
      type="password"
      v-model="form.password_confirmation"
      :helperText="getErrorMessage('password_confirmation')"
      :hasError="Boolean(getErrorMessage('password_confirmation'))"
    />
    <button class="button">Register</button>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import useForm from "@/hooks/useForm";
import { reactive } from "vue";
import Input from "@/components/Form/Input.vue";
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const { submit, getErrorMessage, response } = useForm();

const handleSubmit = () => {
  submit(form, "/api/auth/register").then((response) => {
    router.push({ name: "login" });
  });
};
</script>
