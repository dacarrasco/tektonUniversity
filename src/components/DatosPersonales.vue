<template>
  <h2>ALUMNO:</h2>
  <section class="dataCard">
    <div>DNI: {{ DNI }}</div>
    <div>Nombres: {{ Nom }}</div>
    <div>Apellidos: {{ Ap }}</div>
    <p>Fecha de Nacimiento: {{ FNacimiento }}</p>
    <p>Direccion: {{ Dir }}</p>
    <p>Edad: {{ age(FNacimiento) }}</p>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    DNI: {
      required: true,
      type: [String],
    },
    Nom: {
      required: true,
      type: String,
    },
    Ap: {
      required: true,
      type: String,
    },
    FNacimiento: {
      required: true,
      type: String,
    },
    Dir: {
      required: true,
      type: String,
    },
  },
  methods: {
    age(FNacimiento: string): number {
      const today = new Date();
      const Nacimiento = new Date(FNacimiento);
      return today.getFullYear() - Nacimiento.getFullYear();
    },
  },
};
</script>

<style scoped>
.dataCard {
  color: black;
  column-count: 2;
  margin: auto;
  border-radius: 10px;
  border: solid black medium;
  display: block;
  position: relative;
  width: fit-content;
  align-self: flex-end;
  align-content: space-around;
  padding: 20px;
}
h2 {
  color: white;
  align-self: auto;
  position: relative;
  width: auto;
}
</style>
