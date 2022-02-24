<template>
  <div class="w-full">
    <FilePond
      name="file"
      :label-idle="label"
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="serverConfig"
    />

    <p v-if="helperText" :class="{ 'text-red-500': hasError }">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
const $emits = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "Drop image here",
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

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

// Create component
const FilePond = vueFilePond();

let serverConfig = {
  process: {
    url: "http://localhost:8000/api/uploads",
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    withCredentials: false,
    onload: (response) => {
      $emits("update:modelValue", JSON.parse(response).secure_url);
    },
  },
};
</script>
