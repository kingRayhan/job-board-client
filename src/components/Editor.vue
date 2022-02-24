<template>
  <label :for="name" class="capitalize">{{ name }}</label>
  <div class="w-full p-4 border border-slate-500 min-h-[150px]">
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});
const $emit = defineEmits(["update:modelValue"]);

import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: "prose prose-sm mx-auto focus:outline-none w-full max-w-none",
    },
  },
  onUpdate: ({ editor }) => {
    $emit("update:modelValue", editor.getHTML());
  },
});
</script>
