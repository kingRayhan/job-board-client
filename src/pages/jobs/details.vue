<template>
  <suspense>
    <template #fallback>
      <Loading is-full-page :active="true" />
    </template>

    <JobDetails />
  </suspense>
</template>

<script setup>
import JobDetails from "@/components/JobDetails.vue";
import Loading from "vue-loading-overlay";
</script>
