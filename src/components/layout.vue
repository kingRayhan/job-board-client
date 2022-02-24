<template>
  <div>
    <navbar />
    <main class="max-w-6xl p-2 mx-auto lg:p-0">
      <slot />
    </main>
  </div>
</template>

<script setup>
import navbar from "./navbar.vue";
</script>
