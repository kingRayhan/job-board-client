<template>
  <div class="mx-auto lg:w-8/12">
    <pre>
      {{ form }}
    </pre>

    <form
      action="#"
      @submit.prevent="submit"
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
      <Input
        name="link"
        placeholder="Apply url"
        v-model="form.link"
        :helperText="getErrorMessage('location')"
        :hasError="Boolean(getErrorMessage('location'))"
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
import Input from "@/components/Input.vue";
import AppButton from "@/components/AppButton.vue";
import FileUploader from "@/components/FileUploader.vue";
import Editor from "@/components/Editor.vue";

import { reactive } from "vue";
import useForm from "@/hooks/useForm";

const form = reactive({
  title: "",
  location: "",
  link: "",
  company_name: "",
  company_logo: "",
  description: "",
});

const { submit, getErrorMessage } = useForm(form, "/api/jobs");
</script>
