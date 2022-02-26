<template>
  <h1 class="mb-3 text-2xl font-semibold">Jobs of #{{ route.params.slug }}</h1>

  <suspense>
    <template #fallback>
      <Loading is-full-page :active="true" />
    </template>
    <TagJobList />
  </suspense>
</template>

<script setup>
import TagJobList from "@/components/TagJobList.vue";
import Loading from "vue-loading-overlay";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
