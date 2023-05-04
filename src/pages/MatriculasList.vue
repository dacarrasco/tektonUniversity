<template>
  <ul>
    <li>
      <router-link to="/mantenimiento">
        <vue-feather type="tool" stroke="black"></vue-feather>
      </router-link>
      <span></span><span></span><span></span><span></span>
    </li>
  </ul>
  <h1>Lista Matriculas</h1>

  <input
    class="filtro"
    v-model="filtro"
    @change="onCambio"
    placeholder="Filtro por Alumno"
  />
  <table>
    <tr class="header">
      <td>Codigo</td>
      <td>Semestre</td>
      <td>Alumno</td>
      <td>Curso</td>
      <td>Aprobado</td>
      <td></td>
    </tr>
    <tr class="tabla" v-for="matricula in matriculas" :key="matricula.id">
      <td>
        {{ matricula.CodMatricula }}
      </td>
      <td>
        {{ matricula.Año + "-" + matricula.Semestre }}
      </td>
      <td>
        {{ matricula.Alumno }}
      </td>
      <td>
        {{ matricula.Curso }}
      </td>
      <td v-if="matricula.Aprobado">
        <vue-feather type="check" stroke="white"></vue-feather>
      </td>
      <td v-else>
        <vue-feather type="x" stroke="red"></vue-feather>
      </td>
      <td>
        <ul>
          <li @click="deleteJSON(matricula.id)">
            Eliminar <span></span><span></span><span></span><span></span>
          </li>
        </ul>
      </td>
    </tr>
  </table>
  <p v-if="matriculas.length == 0">No Hay Matriculas</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import getmatriculadata from "@/API/matriculahelper";
import matriculaInterface from "@/types/matriculaInterface";

const filtro = ref<string>("");
const matriculas = ref<matriculaInterface[]>([]);

onMounted(() => {
  getmatriculadata().then((lista) => {
    setTimeout(() => {
      matriculas.value = lista.data;
    }, 0);
  });
});

function onCambio(): void {
  getmatriculadata(filtro.value).then((lista) => {
    setTimeout(() => {
      matriculas.value = lista.data;
    }, 0);
  });
}

async function deleteJSON(id: string) {
  try {
    const response = await fetch(
      `https://retoolapi.dev/b8jz2L/matricula/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Ubuntu, sans-serif;
}

.filtro {
  border: solid black 2px;
  border-radius: 10px;
  width: 50%;
  padding: 10px;
  margin: 20px;
  color: black;
  display: block;
  margin-left: 25%;
}
.filtro::placeholder {
  color: black;
}
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  max-height: 700px;
  overflow-y: scroll;
  display: block;
  margin: 0.5rem;
}
.modal-table {
  background-color: lightgray;
  border-color: solid 1px black;
  border-collapse: collapse;
  width: 50%;
  margin: 0;
  padding: 0;
  display: block;
  margin-left: 25%;
  padding-left: 13%;
}
.modal-table td th {
  margin-left: 25%;
  border: 1px solid black;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: lightgray;
}

tr:hover {
  background-color: #ddd;
}

.header {
  color: #ddd;
  font-weight: bolder;
}

th {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background-color: #04aa6d;
  color: black;
  width: fit-content;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
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
  margin: 1em;
  margin-left: 35%;
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
td ul li {
  font-size: 8px;
  margin: 0;
}
</style>
