<template>
  <Job :job="job" :show_details_button="false" />
  <div class="max-w-3xl mx-auto mt-10">
    <div v-html="job.description" class="typography"></div>
  </div>
</template>

<script setup>
import api from "@/lib/api";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Job from "./Job.vue";
const route = useRoute();
const job = ref(null);

const { data, ok } = await api.get(`/api/jobs/${route.params.slug}`);
job.value = data.data;
</script>
