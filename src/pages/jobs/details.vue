<template>
  <suspense>
    <template #fallback>
      <h1>Loading</h1>
    </template>
    <JobDetails />
  </suspense>
</template>

<script setup>
import JobDetails from "@/components/JobDetails.vue";
</script>
