<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="capitalize">{{ name }}</label>

    <Multiselect
      :options="tags"
      :multiple="true"
      :taggable="true"
      tag-placeholder="Add this as new tag"
      placeholder="Type to search or add tag"
      label="label"
      track-by="value"
      v-model="modelValue"
      @update:model-value="handleUpdateTags"
      @tag="createNewTag"
    />

    <p v-if="helperText" class="text-sm" :class="{ 'text-red-500': hasError }">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import api from "@/lib/api";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

import { onMounted, ref, watch } from "vue";
const tags = ref([]);
const selectedTags = ref([]);
const loading = ref(false);

const $emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
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

// slugify
const slugify = (str) => str.toLowerCase().split(" ").join("-").toLowerCase();

onMounted(() => {
  loading.value = true;
  api.get("/api/tags").then(({ data }) => {
    loading.value = false;
    tags.value = data.data.map(({ id, name }) => ({ value: id, label: name }));
  });
});

const createNewTag = (label) => {
  api
    .post("/api/tags", {
      name: label,
      slug: slugify(label),
    })
    .then(({ data }) => {
      props.modelValue.push({
        value: data.data.id,
        label: data.data.name,
      });
    });
};

const handleUpdateTags = (tags) => {
  $emit("update:modelValue", tags);
};
</script>
