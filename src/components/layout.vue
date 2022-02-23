<template>
  <div>
    <navbar />
    <main class="max-w-6xl mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import navbar from "./navbar.vue";
</script>
