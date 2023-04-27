<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { FormData } from "./CursosFormVorms.vue";
import CursosFormVorms from "./CursosFormVorms.vue";

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
    <CursosFormVorms @submit="(formData) => emit('submit', formData)" />
  </VueFinalModal>
</template>
