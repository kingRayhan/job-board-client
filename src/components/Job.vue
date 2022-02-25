<template>
  <div
    class="flex justify-between p-4 pb-2 border-t-2 border-b-2 border-gray-200 group"
    :class="{ 'bg-indigo-50': job.highlighted }"
  >
    <img :src="job.company.logo" class="w-12 h-12 mr-4" />

    <div class="flex flex-wrap items-center justify-between w-full">
      <div class="w-full mb-2 md:w-4/12">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4 mr-1 text-yellow-500"
            v-if="job.pinned"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>

          <h2 class="font-bold leading-none">
            {{ job.title }}
          </h2>
        </div>

        <a href="#" class="text-sm">
          {{ job.company.name }}
        </a>

        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4 mr-1 text-gray-600"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-sm text-gray-600">
            {{ job.location }}
          </div>
        </div>

        <div class="flex gap-2 mt-2">
          <a href="#" class="#"> #Laravel </a>
          <a href="#" class="#"> #api-doc </a>
          <a href="#" class="#"> #unit-test </a>
        </div>
      </div>

      <div class="mb-2">
        <slot name="action">
          <div class="flex gap-2 transition-opacity duration-200 opacity-100">
            <router-link
              :to="{ name: 'jobs-update', params: { slug: job.slug } }"
              class="inline-block px-3 py-2 font-bold text-indigo-400 bg-white border-2 border-indigo-400 rounded-lg hover:text-opacity-80"
            >
              Edit
            </router-link>
            <button
              v-if="job.user.id === auth.user.id"
              @click="deleteJob"
              class="inline-block px-3 py-2 font-bold text-red-400 bg-white border-2 border-red-400 rounded-lg hover:text-opacity-80"
            >
              Delete
            </button>
            <router-link
              v-if="show_details_button"
              :to="{ name: 'jobs-details', params: { slug: job.slug } }"
              class="inline-block px-3 py-2 font-bold text-indigo-400 bg-white border-2 border-indigo-400 rounded-lg hover:text-opacity-80"
            >
              Details
            </router-link>
            <a
              target="_blank"
              :href="job.link"
              class="inline-block px-3 py-2 font-bold text-indigo-400 bg-white border-2 border-indigo-400 rounded-lg hover:text-opacity-80"
            >
              Apply for this job
            </a>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/lib/api";
import useAuthStore from "@/stores/auth";

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  show_details_button: {
    type: Boolean,
    default: true,
  },
});

const $emits = defineEmits(["deleted"]);

const auth = useAuthStore();

const deleteJob = async () => {
  if (confirm("Sure to delete?")) {
    const { ok } = await api.delete(`/api/jobs/${props.job.id}`);
    $emits("deleted", props.job.id);
  }
};
</script>
