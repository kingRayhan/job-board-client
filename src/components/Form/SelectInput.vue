<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="capitalize">{{ name }}</label>
    <select
      :name="name"
      :id="name"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    >
      <option value="">Select job type</option>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="helperText" class="text-sm" :class="{ 'text-red-500': hasError }">
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
  options: {
    type: Array,
    default: () => [],
  },
});
</script>
