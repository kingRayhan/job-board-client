<template>
  <suspense>
    <template #fallback>skelleton</template>
    <JobListVue />
  </suspense>
</template>

<script setup>
import JobListVue from "@/components/JobList.vue";
</script>
