<template>
  <div class="w-full">
    <div
      v-if="modelValue"
      class="flex items-center justify-between p-3 border border-slate-700"
    >
      <div class="flex items-center gap-2">
        <img class="w-10" :src="modelValue" alt="" />
        <p>Company Logo</p>
      </div>

      <button type="button" @click="handleDelete" class="text-3xl text-red-500">
        &times;
      </button>
    </div>

    <FilePond
      v-if="!modelValue"
      name="file"
      :label-idle="label"
      v-bind:allow-multiple="false"
      accepted-file-types="image/jpeg, image/png"
      :server="serverConfig"
    />

    <p v-if="helperText" :class="{ 'text-red-500': hasError }">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import api from "@/lib/api";

const $emits = defineEmits(["update:modelValue"]);
const props = defineProps({
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
      $emits("update:modelValue", JSON.parse(response).url);
    },
  },
};

const handleDelete = () => {
  api.delete(`/api/uploads?url=${props.modelValue}`);
  $emits("update:modelValue", "");
};
</script>
