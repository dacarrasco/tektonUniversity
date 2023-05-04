<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { FormData } from "./RegisterAlumno.vue";
import RegisterAlumno from "./RegisterAlumno.vue";

const emit = defineEmits<{
  (event: "submit", formData: FormData): void;
}>();
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <RegisterAlumno @submit="(formData) => emit('submit', formData)" />
  </VueFinalModal>
</template>
