<template>
  <div class="flex flex-col gap-10">
    <Job v-for="job in jobs" :key="job.id" :job="job" />
  </div>

  <div v-if="!jobs.length">
    <h2 class="text-2xl italic text-slate-600">No job posted yet</h2>
  </div>

  <div ref="target"></div>
</template>

<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import api from "@/lib/api";
import Job from "@/components/Job.vue";
import { reactive, ref } from "vue";

// states
const target = ref(null);
const jobs = ref([]);
const pagination = reactive({
  page: 1,
  last_page: 1,
});

// load jobs
const { data } = await api.get("api/jobs");
jobs.value = data.data;
pagination.last_page = data.meta.last_page;

const loadMore = (page) => {
  api.get(`/api/jobs?page=${page}`).then(({ data }) => {
    jobs.value = jobs.value.concat(data.data);
    pagination.last_page = data.meta.last_page;
    pagination.page = page + 1;
  });
};

// use intersection observer
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && pagination.page <= pagination.last_page) {
    loadMore(pagination.page);
  }
});
</script>
