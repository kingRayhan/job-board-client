<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="capitalize">{{ name }}</label>
    <input
      :name="name"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="name"
      type="text"
      class="w-full rounded-sm bg-slate-50"
      v-bind="$attrs"
    />

    <p v-if="helperText" :class="{ 'text-red-500': hasError }">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  helperText: {
    type: String,
    default: "",
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});
</script>
