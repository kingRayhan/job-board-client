<template>
  <Job :job="job" :show_details_button="false" />
  <div class="max-w-3xl mx-auto mt-10">
    <div
      v-if="job.description"
      v-html="job.description"
      class="typography"
    ></div>
    <p class="text-xl italic text-center text-slate-700">No description</p>
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
