<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
  (e: "confirm"): void;
}>();
</script>

<template>
  <VueFinalModal @update:model-value="(val) => emit('update:modelValue', val)">
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <slot />
    <button @click="emit('confirm')">Confirmar</button>
  </VueFinalModal>
</template>

<style scoped>
* {
  text-align: center;
  align-items: center;
}

button {
  align-items: center;
  margin: auto;
  color: white;
  border: solid white thick;
  border-radius: 10px;
  padding: 20px;
  font-weight: bolder;
  display: flex;
}
button:hover {
  align-items: center;
  margin: auto;
  color: blue;
  border: solid blue thick;
  padding: 20px;
  font-weight: bolder;
  display: flex;
}
</style>
