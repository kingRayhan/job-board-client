<template>
  <h1 class="mb-3 text-2xl font-semibold">My Job posts</h1>

  <suspense>
    <template #fallback>
      <Loading is-full-page :active="true" />
    </template>
    <MyJobList />
  </suspense>
</template>

<script setup>
import MyJobList from "@/components/MyJobList.vue";
import Loading from "vue-loading-overlay";
</script>
