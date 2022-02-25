<template>
  <div class="mx-auto lg:w-8/12">
    <pre>
      {{ form }}
    </pre>

    <form
      action="#"
      @submit.prevent="handleSubmit"
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
  </div>
</template>

<script setup>
import Input from "@/components/Form/Input.vue";
import JobTagInput from "@/components/JobTagInput.vue";

import AppButton from "@/components/Form/AppButton.vue";
import FileUploader from "@/components/Form/FileUploader.vue";
import Editor from "@/components/Form/Editor.vue";
import SelectInput from "@/components/Form/SelectInput.vue";
import { useRouter } from "vue-router";

import { reactive, ref } from "vue";
import useForm from "@/hooks/useForm";
import api from "@/lib/api";
const router = useRouter();

const form = reactive({
  title: "",
  location: "",
  link: "",
  type: "",
  company_name: "",
  company_logo: "",
  description: "",
  tags: [],
});

const { submit, getErrorMessage } = useForm();

const handleSubmit = () => {
  let tags = form.tags.map((tag) => tag.value);

  submit({ ...form, tags }, "/api/jobs").then(() => {
    router.push({ name: "home" });
  });
};
</script>
