<template>
  <form
    action="#"
    @submit.prevent="$emit('submit')"
    class="flex flex-col items-start gap-4"
  >
    <Input
      name="title"
      placeholder="Job title"
      v-model="form.title"
      :helperText="getErrorMessage('title')"
      :hasError="Boolean(getErrorMessage('title'))"
    />

    <Input
      name="location"
      placeholder="Job location"
      v-model="form.location"
      :helperText="getErrorMessage('location')"
      :hasError="Boolean(getErrorMessage('location'))"
    />

    <JobTagInput name="Tags" v-model="form.tags" />

    <SelectInput
      name="Job Type"
      placeholder="Job location"
      v-model="form.type"
      :options="[
        { label: 'Full Time', value: 'full_time' },
        { label: 'Part Time', value: 'part_time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Temporary', value: 'temporary' },
        { label: 'Internship', value: 'internship' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Remote', value: 'remote' },
      ]"
      :helperText="getErrorMessage('location')"
      :hasError="Boolean(getErrorMessage('location'))"
    />
    <Input
      name="link"
      placeholder="Apply url"
      v-model="form.link"
      :helperText="getErrorMessage('link')"
      :hasError="Boolean(getErrorMessage('link'))"
    />

    <Input
      name="company_name"
      placeholder="Company Name"
      v-model="form.company_name"
      :helperText="getErrorMessage('company_name')"
      :hasError="Boolean(getErrorMessage('company_name'))"
    />
    <FileUploader
      label="Company logo"
      v-model="form.company_logo"
      :helperText="getErrorMessage('company_logo')"
      :hasError="Boolean(getErrorMessage('company_logo'))"
    />

    <Editor name="Job Description" v-model="form.description" />

    <AppButton>Submit</AppButton>
  </form>
</template>

<script setup>
import Input from "@/components/Form/Input.vue";
import JobTagInput from "@/components/JobTagInput.vue";

import AppButton from "@/components/Form/AppButton.vue";
import FileUploader from "@/components/Form/FileUploader.vue";
import Editor from "@/components/Form/Editor.vue";
import SelectInput from "@/components/Form/SelectInput.vue";

defineProps({
  form: {
    type: Object,
    default: () => ({
      title: "",
      location: "",
      type: "",
      link: "",
      company_name: "",
      company_logo: "",
      description: "",
      tags: [],
    }),
  },
  getErrorMessage: {
    type: Function,
  },
});

defineEmits(["submit"]);
</script>
