<template>
  <suspense>
    <template #fallback>
      <Loading is-full-page :active="true" />
    </template>
    <JobListVue />
  </suspense>
</template>

<script setup>
import JobListVue from "@/components/JobList.vue";
import Loading from "vue-loading-overlay";
</script>
