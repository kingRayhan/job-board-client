<template>
  <Loading is-full-page v-model:active="loading" />
  <div class="mx-auto lg:w-8/12">
    <JobForm
      :form="form"
      :getErrorMessage="getErrorMessage"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Loading from "vue-loading-overlay";

import { reactive, ref } from "vue";
import useForm from "@/hooks/useForm";
import api from "@/lib/api";
import JobForm from "@/components/Form/JobForm.vue";
const router = useRouter();

const form = reactive({
  title: "",
  location: "",
  link: "",
  type: "",
  company_name: "",
  company_logo: "",
  description: "",
  tags: [],
});
const loading = ref(false);

const { submit, getErrorMessage } = useForm();

const handleSubmit = () => {
  loading.value = true;
  let tags = form.tags.map((tag) => tag.value);

  submit({ ...form, tags }, "/api/jobs")
    .then(() => {
      loading.value = false;
      router.push({ name: "home" });
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
