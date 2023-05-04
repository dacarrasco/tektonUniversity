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
    <ul>
      <li @click="emit('confirm')">
        Confirmar <span></span><span></span><span></span><span></span>
      </li>
    </ul>
  </VueFinalModal>
</template>

<style scoped>
* {
  text-align: center;
  align-items: center;
  background-color: lightgray;
  width: 50%;
  margin-left: 25%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 25%;
  padding-left: 5%;
}

ul li {
  --c: #306090;
  color: var(--c);
  font-size: 16px;
  border: 0.3em solid var(--c);
  border-radius: 0.5em;
  width: 12em;
  height: 3em;
  text-transform: uppercase;
  font-weight: bold;
  font-family: sans-serif;
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 3em;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  margin-left: 25%;
}

ul li span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: var(--c);
  transform: translateY(150%);
  border-radius: 50%;
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  transition-delay: calc((var(--n) - 1) * 0.1s);
  z-index: -1;
}

ul li:hover {
  color: black;
}

ul li:hover span {
  transform: translateY(0) scale(2);
}

ul li span:nth-child(1) {
  --n: 1;
}

ul li span:nth-child(2) {
  --n: 2;
}

ul li span:nth-child(3) {
  --n: 3;
}
ul li span:nth-child(4) {
  --n: 4;
}
</style>
