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
import { useRoute, useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import { reactive, onMounted, ref } from "vue";
import useForm from "@/hooks/useForm";
import api from "@/lib/api";
import JobForm from "@/components/Form/JobForm.vue";
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const job_id = ref(null);
const job_slug = ref(null);

const form = reactive({
  title: "",
  location: "",
  link: "",
  type: "",
  company_name: "",
  company_logo: "",
  description: "",
});

onMounted(async () => {
  loading.value = true;
  const { ok, data } = await api.get(`/api/jobs/${route.params.slug}`);

  if (ok) {
    form.title = data.data.title;
    form.location = data.data.location;
    form.link = data.data.link;
    form.type = data.data.type;
    form.company_name = data.data.company.name;
    form.company_logo = data.data.company.logo;
    form.description = data.data.description;
    form.tags = data.data.tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));

    job_id.value = data.data.id;
    job_slug.value = data.data.slug;

    loading.value = false;
  } else {
    loading.value = false;
    alert("Failed to load");
  }
});

const { submit, getErrorMessage } = useForm();

const handleSubmit = () => {
  loading.value = true;
  let tags = form.tags.map((tag) => tag.value);
  submit({ ...form, tags }, `/api/jobs/${job_id.value}`, "put")
    .then(() => {
      router.push({ name: "jobs-details", params: { slug: job_slug.value } });
    })
    .catch(() => {
      loading.value = false;
    });
};
</script>
