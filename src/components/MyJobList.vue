<template>
  <div class="flex flex-col gap-10">
    <Job
      v-for="job in jobs"
      :key="job.id"
      :job="job"
      @deleted="handleRemoveJob"
    />
  </div>

  <div v-if="!jobs.length">
    <h2 class="text-2xl italic text-slate-600">No job posted yet</h2>
  </div>

  <div
    ref="target"
    class="my-8 text-center"
    v-if="pagination.page < pagination.last_page"
  >
    <SyncLoader color="#6560EC" />
  </div>
</template>

<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import api from "@/lib/api";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import Job from "@/components/Job.vue";
import { reactive, ref } from "vue";
import useAuthStore from "@/stores/auth";

const auth = useAuthStore();

// states
const target = ref(null);
const jobs = ref([]);
const pagination = reactive({
  page: 1,
  last_page: 1,
});

// load jobs
const { data } = await api.get("api/jobs?user_id=" + auth.user.id);
jobs.value = data.data;
pagination.last_page = data.meta.last_page;

const loadMore = (page) => {
  api.get(`/api/jobs?page=${page}&user_id=${auth.user.id}`).then(({ data }) => {
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

const handleRemoveJob = (jobId) => {
  jobs.value = jobs.value.filter((job) => job.id !== jobId);
};
</script>
